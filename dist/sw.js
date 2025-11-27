self.addEventListener("install", (event) => {
    console.log("Service Worker: Installed");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activated");
});

self.addEventListener("fetch", (event) => {
    // 캐싱은 하지 않고 단순히 네트워크 요청만 통과시킴
});
