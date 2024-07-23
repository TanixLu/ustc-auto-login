const username_input = document.getElementById("username");
const password_input = document.getElementById("password");
const mail_input = document.getElementById("mail");
const mail_password_input = document.getElementById("mail_password");

chrome.storage.sync.get(
    ["username", "password", "mail", "mail_password"],
    ({username, password, mail, mail_password}) => {
        username_input.value = username;
        password_input.value = password;
        mail_input.value = mail;
        mail_password_input.value = mail_password;
    });

// 任何输入改变都立即保存
username_input.addEventListener("input", save);
mail_input.addEventListener("input", save);
password_input.addEventListener("input", save);
mail_password_input.addEventListener("input", save);

function save() {
    chrome.storage.sync.set({
        username: username_input.value,
        password: password_input.value,
        mail: mail_input.value,
        mail_password: mail_password_input.value
    });
}
