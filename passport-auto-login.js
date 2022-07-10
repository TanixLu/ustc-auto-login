chrome.storage.sync.get(["passportLastTime"], ({passportLastTime}) => {
    // 如果距上次自动登录passport不足3s，可能是密码错误，需要暂停，否则密码连续错误五次账号冻结
    if (Date.now() - passportLastTime < 3000) return;

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const [loginForm] = document.getElementsByClassName("loginForm");
    chrome.storage.sync.get(["username", "password"], ({username, password}) => {
        usernameInput.value = username;
        passwordInput.value = password;
        chrome.storage.sync.set({passportLastTime: Date.now()});
        loginForm.submit();
    });
});
