function extract_str_between(str, left, right) {
    const left_index = str.indexOf(left);
    if (left_index === -1) return '';
    const right_index = str.indexOf(right, left_index + left.length);
    if (right_index === -1) return '';
    return str.substring(left_index + left.length, right_index);
}


const login_form = document.querySelector(".loginForm");
const cas_lt_value = extract_str_between(document.body.outerHTML, '$("#CAS_LT").val("', '");');
const validate_img = document.querySelector(".validate-img");


function wait_to_submit() {
    if (login_form.resultInput.value && validate_img.complete) {
        OCRAD(validate_img, {numeric: true}, function (code) {
            login_form.LT.value = code;
            login_form.submit();
        });
    } else {
        setTimeout(wait_to_submit, 100);
    }
}


chrome.storage.sync.get(["passportLastTime"], ({passportLastTime}) => {
    // 如果距上次自动登录passport不足3s，可能是密码错误，需要暂停，否则密码连续错误五次账号冻结
    if (Date.now() - passportLastTime < 3000) return;

    chrome.storage.sync.get(["username", "password"], ({username, password}) => {
        chrome.storage.sync.set({passportLastTime: Date.now()});
        login_form.username.value = username;
        login_form.password.value = password;
        login_form.CAS_LT.value = cas_lt_value;
        wait_to_submit();
    });
});
