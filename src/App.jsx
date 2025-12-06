import { useEffect, useState } from "react";
import "./App.css";

// 🖼 이미지
import KuromiMain from "./img/kuromi-add.png";
import KuromiAddIcon from "./img/kuromi-pop.png";
import KuromiCheck from "./img/kuromi-check.png";
import KuromiHeart from "./img/kuromi-heart.png";

// 🎵 사운드
import soundOpen from "./sounds/kuromi_open.mp3";
import soundAdd from "./sounds/kuromi_add.mp3";
import soundDone from "./sounds/kuromi_done.mp3";
import soundExit from "./sounds/kuromi_exit.mp3";
import soundMagic from "./sounds/kuromi_magic.mp3";
import soundDelete from "./sounds/korumi_deleteTodo.mp3";
import soundRename from "./sounds/kuromi_rename.mp3";
import soundCorrection from "./sounds/kuromi_correction.mp3";

const playSound = (file) => {
    const audio = new Audio(file);
    audio.play().catch(() => { });
};

function App() {
    // ⏰ 시계
    const [time, setTime] = useState("");

    // 👤 사용자 이름 상태
    const [username, setUsername] = useState(
        () => localStorage.getItem("username") || "사용자"
    );
    const [editingName, setEditingName] = useState(false);

    // 📝 할 일 목록
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");

    // ---------------- 시계 ----------------
    useEffect(() => {
  setTime(new Date().toLocaleTimeString("ko-KR"));

  const t = setInterval(() => {
    setTime(new Date().toLocaleTimeString("ko-KR"));
  }, 1000);

  return () => clearInterval(t);
}, []);

useEffect(() => {
  const enableSound = () => {
    playSound(soundOpen);
    document.removeEventListener("click", enableSound);
  };

  document.addEventListener("click", enableSound);

  return () => {
    document.removeEventListener("click", enableSound);
  };}, []);

    // 저장
    useEffect(() => localStorage.setItem("todos", JSON.stringify(todos)), [todos]);
    useEffect(() => localStorage.setItem("username", username), [username]);

    // ---------------- 이름 수정 ----------------
    const finishUsernameEdit = () => {
        setEditingName(false);
        if (!username.trim()) setUsername("사용자");
        playSound(soundRename);
    };

    // ---------------- 할 일 기능 ----------------
    const addTodo = () => {
        if (!newTodo.trim()) return;
        setTodos([{ id: Date.now(), text: newTodo.trim(), completed: false }, ...todos]);
        setNewTodo("");
        playSound(soundAdd);
    };

    const toggleComplete = (id) => {
        setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
        playSound(soundDone);
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((t) => t.id !== id));
        playSound(soundDelete);
    };

    const finishEdit = () => {
        setTodos(todos.map((t) =>
            t.id === editingId ? { ...t, text: editText.trim() } : t
        ));
        playSound(soundCorrection);
        setEditingId(null);
        setEditText("");
    };

    return (
        <div className="wrapper">

            {/* 구름 - public 경로 고정 */}
            <img src="/img/cloud1.png" className="cloud cloud1" alt="" />
            <img src="/img/cloud2.png" className="cloud cloud2 " alt="" />
            <img src="/img/cloud3.png" className="cloud cloud3 " alt="" />

            {/* 큰 쿠로미 */}
            <img
                src={KuromiMain}
                className="big-kuromi"
                alt="kuromi"
                onClick={() => playSound(soundMagic)}
            />

            <div className="app">

                {/* 이름 수정 */}
                <h2 className="title">
                    💜{" "}
                    {editingName ? (
                        <input
                            type="text"
                            className="username-editing"
                            value={username}
                            autoFocus
                            onChange={(e) => setUsername(e.target.value)}
                            onBlur={finishUsernameEdit}
                            onKeyDown={(e) => e.key === "Enter" && finishUsernameEdit()}
                        />
                    ) : (
                        <span
                            className="username-display"
                            onClick={() => setEditingName(true)}
                        >
                            {username}
                        </span>
                    )}{" "}
                    Todo List 🍭
                </h2>

                {/* 시계  */}
                <p className="date">{time}</p>
                {/* 시계  뒷배경*/}
                <div className="dream-glow"></div>

                <p className="sub-text">원하는 만큼 성장하길…🎀</p>

                {/* 입력칸 */}
                <div className="todo-input-wrap">
                    <input
                        type="text"
                        placeholder="할 일을 입력하세요💜"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTodo()}
                        style={{
                            width: "220px",
                        }}
                    />

                    <button className="add-btn" onClick={addTodo}>
                        <img src={KuromiAddIcon} className="add-icon" alt="추가" />
                    </button>
                </div>

                {/* 리스트 */}
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <button className="check-btn" onClick={() => toggleComplete(todo.id)}>
                                <img
                                    src={todo.completed ? KuromiHeart : KuromiCheck}
                                    className="btn-icon"
                                    alt=""
                                />
                            </button>

                            {editingId === todo.id ? (
                                <input
                                    className="edit-input todo-text single-line"
                                    autoFocus
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && finishEdit()}
                                    onBlur={() => {
                                        setTimeout(() => finishEdit(), 120);
                                    }}
                                />

                            ) : (
                                <span
                                    className={`todo-text single-line ${todo.completed ? "completed" : ""
                                        }`}
                                >
                                    {todo.text}
                                </span>
                            )}


                            <div className="action-group">
                                <button className="text-btn" onClick={() => (setEditingId(todo.id), setEditText(todo.text))}>
                                    수정
                                </button>
                                <button className="text-btn delete" onClick={() => deleteTodo(todo.id)}>
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
