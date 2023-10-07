chrome.storage.sync.get(["mail_last_time"], ({mail_last_time}) => {
    // 如果距上次自动登录不足3s，可能是密码错误，需要暂停
    if (Date.now() - mail_last_time < 3000) return;

    const mail_input = document.getElementById("uid");
    const password_input = document.getElementById("password");
    const login_button = document.getElementById("login_button");
    chrome.storage.sync.get(["mail", "mail_password", "password"], ({mail, mail_password, password}) => {
        mail_input.value = mail;
        if (mail_password) {
            password_input.value = mail_password;
        } else {
            password_input.value = password;
        }
        chrome.storage.sync.set({mail_last_time: Date.now()});
        login_button.click();
    });
});
