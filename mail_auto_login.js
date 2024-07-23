function check() {
    const checkbox_input = document.querySelector('input.j-authorize-device[type="checkbox"]');
    if (checkbox_input && !checkbox_input.checked) {
        checkbox_input.checked = true;
        const checkbox_i = document.querySelector('i[class="checkbox"]');
        checkbox_i.classList.add("checkbox-checked");
        console.log("mail_auto_login.js: checkbox checked");
    } else {
        setTimeout(check, 100);
    }
}

check();

chrome.storage.sync.get(["mail_last_time"], ({mail_last_time}) => {
    // 如果距上次自动登录不足3s，可能是密码错误，需要暂停
    if (Date.now() - mail_last_time < 3000) {
        document.documentElement.style.visibility = "visible";
        console.log("mail_auto_login.js: too frequent, stop auto login");
        return;
    }

    const mail_input = document.getElementById("uid");
    const password_input = document.getElementById("password");
    const remember_user_checkbox = document.querySelector("#saveUsername + i[class='checkbox']");
    const login_button = document.querySelector('button.u-btn.submit');
    chrome.storage.sync.get(["mail", "mail_password", "password"], ({mail, mail_password, password}) => {
        const [mail_name, mail_suffix] = mail.split("@");
        // 输入邮箱用户名
        mail_input.value = mail_name;
        // 选择对应邮箱后缀
        document.querySelector(`li[data-domain="${mail_suffix}"] > a`).click();
        console.log(`mail_auto_login.js: mail_suffix = ${mail_suffix}`);
        // 输入密码
        if (mail_password) {
            password_input.value = mail_password;
            console.log(`mail_auto_login.js: use mail_password`);
        } else {
            password_input.value = password;
            console.log(`mail_auto_login.js: use password`);
        }
        // 记住密码
        if (remember_user_checkbox) remember_user_checkbox.click();
        console.log(`mail_auto_login.js: saveUsername = ${remember_user_checkbox.checked}`);
        const now = Date.now();
        chrome.storage.sync.set({mail_last_time: now}).then(_ => console.log(`mail_last_time: ${now}`));
        login_button.click();
    });
});
