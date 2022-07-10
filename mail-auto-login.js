chrome.storage.sync.get(["mailLastTime"], ({mailLastTime}) => {
    // 如果距上次自动登录不足3s，可能是密码错误，需要暂停
    if (Date.now() - mailLastTime < 3000) return;

    const mailInput = document.getElementById("uid");
    const passwordInput = document.getElementById("password");
    const loginButton = document.getElementById("login_button");
    chrome.storage.sync.get(["mail", "password"], ({mail, password}) => {
        mailInput.value = mail;
        passwordInput.value = password;
        chrome.storage.sync.set({mailLastTime: Date.now()});
        loginButton.click();
    });
});
