import { useState } from "react";
import "./App.css";
import checkSound from "./sound.mp3";

function App() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = () => {
        if (!input.trim()) return;

        setTodos([
            ...todos,
            { id: Date.now(), text: input, done: false },
        ]);

        setInput("");
    };

    const toggleTodo = (id) => {
        const audio = new Audio(checkSound);
        audio.volume = 0.6;
        audio.play();

        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, done: !todo.done } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <div className="app-container">
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <div className="cloud cloud-3" />

            <div className="card">
                <h1 className="title">💜 HANA Todo List 🐰</h1>
                <p className="subtitle">원하는 만큼 성장하는 중...🌸</p>

                <div className="inputBox">
                    <input
                        type="text"
                        placeholder="할 일을 입력하세요💜"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button onClick={addTodo} className="add-btn">
                        ➕
                    </button>
                </div>

                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id} className="todo-item">
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span className={todo.done ? "done" : ""}>{todo.text}</span>
                            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
