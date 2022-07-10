const usernameInput = document.getElementById("username");
const mailInput = document.getElementById("mail");
const passwordInput = document.getElementById("password");

chrome.storage.sync.get(["username", "mail", "password"], ({username, mail, password}) => {
    usernameInput.value = username;
    mailInput.value = mail;
    passwordInput.value = password;
});

// 任何输入改变都立即保存
usernameInput.addEventListener("input", save);
mailInput.addEventListener("input", save);
passwordInput.addEventListener("input", save);

function save() {
    chrome.storage.sync.set({username: usernameInput.value, mail: mailInput.value, password: passwordInput.value});
}
