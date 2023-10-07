chrome.storage.sync.get(["passportLastTime"], ({passportLastTime}) => {
    // 如果距上次自动登录passport不足3s，可能是密码错误，需要暂停，否则密码连续错误五次账号冻结
    if (Date.now() - passportLastTime < 3000) return;

    const username_input = document.getElementById("username");
    const password_input = document.getElementById("password");
    const [login_form] = document.getElementsByClassName("loginForm");
    const login_btn = document.getElementById("login");
    chrome.storage.sync.get(["username", "password"], ({username, password}) => {
        username_input.value = username;
        password_input.value = password;
        login_form.showCode.value = '';
        chrome.storage.sync.set({passportLastTime: Date.now()});
        login_btn.click();
    });
});
