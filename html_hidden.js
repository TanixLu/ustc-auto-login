// 隐藏界面，视觉效果好；不渲染DOM，提高速度
document.documentElement.style.visibility = "hidden";
console.log("html_hidden.js: loaded");

// 七秒钟后还没完成登录，则显示界面
setTimeout(() => {
    document.documentElement.style.visibility = "visible";
    console.log("html_hidden.js: show html after 7s");
}, 7000);
