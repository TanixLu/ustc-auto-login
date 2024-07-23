// 检测验证码是否正确
chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
    if (message.type === "check_sm_code") {
        console.log("service_worker.js: message = ", message);

        fetch("https://passport.ustc.edu.cn/loginValidateSm", {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(message.data).toString(),
        })
            .then(response => response.text())
            .then(text => {
                sendResponse(text === "success");
            })
            .catch(error => {
                console.error("Fetch error:", error);
                sendResponse(false);
            });

        // 返回 true 表示 sendResponse 将会异步调用
        return true;
    }
});
