function get_url_param(name) {
    const url_params = new URLSearchParams(window.location.search);
    return url_params.get(name);
}

function get_component_value(components, k) {
    for (const {key, value} of components) {
        if (key === k) return value;
    }
    return '';
}

function get_fingerprint() {
    return new Promise(function (resolve, _) {
        Fingerprint2.get(function (components) {
            let fingerprint_string = '';
            for (const component_name of ['fonts', 'deviceMemory', 'hardwareConcurrency', 'timezone', 'cpuClass', 'platform']) {
                fingerprint_string += JSON.stringify(get_component_value(components, component_name));
            }
            const hash = CryptoJS.SHA256(fingerprint_string);
            resolve(hash.toString());
        });
    });
}

const send_button = document.getElementById('send');
const confirm_button = document.getElementById('confirm');
const original_button_color = confirm_button.style.backgroundColor;
const trust_checkbox_input = document.getElementById('trust_checkbox');

// 勾选信任设备
document.querySelector("#trust_checkbox").checked = true;
console.log('login_sm_helper.js: trust_checkbox checked');

// 聚焦到验证码输入框
const sm_code_input = document.querySelector("#sm-code");
sm_code_input.focus();
console.log('login_sm_helper.js: sm_code input focused');

// 自动检测验证码是否正确
const valid_sm_code_regex = /^\d{6}$/;
const tried_sm_codes = new Set();

const code_mobile = get_url_param('code_mobile');
console.log(`login_sm_helper.js: code_mobile = ${code_mobile}`);
const service = get_url_param('service');
console.log(`login_sm_helper.js: service = ${service}`);
const secondCode = get_url_param('secondCode');
console.log(`login_sm_helper.js: secondCode = ${secondCode}`);

get_fingerprint().then((fingerprint) => {
    console.log(`login_sm_helper.js: fingerprint = ${fingerprint}`);

    sm_code_input.addEventListener('input', (_) => {
        const sm_code = sm_code_input.value;
        console.log(`login_sm_helper.js: sm_code = ${sm_code}`);

        if (valid_sm_code_regex.test(sm_code) && !tried_sm_codes.has(sm_code)) {
            tried_sm_codes.add(sm_code);
            console.log(`login_sm_helper.js: sm_code ${sm_code} is valid and not checked`);

            send_button.disabled = true;
            send_button.style.backgroundColor = 'gray';
            confirm_button.disabled = true;
            confirm_button.style.backgroundColor = 'gray';
            trust_checkbox_input.disabled = true;
            sm_code_input.disabled = true;

            const data = {
                'code_mobile': code_mobile,
                'smCode': sm_code,
                'trust': 'trust_checkbox',
                'fingerprint': fingerprint,
                'service': service,
                'secondCode': secondCode,
            }
            chrome.runtime.sendMessage({
                type: "check_sm_code", data
            }, (result) => {
                console.log(`login_sm_helper.js: check_sm_code result = ${result}`);
                if (result) {
                    const form = document.createElement('form');
                    form.setAttribute('style', 'display: none;');
                    form.setAttribute('action', 'login');
                    form.setAttribute('method', 'post');
                    form.setAttribute('target', '_self');
                    const form_data = {
                        secondCode,
                        'second': 2,
                    }
                    for (const [k, v] of Object.entries(form_data)) {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'hidden');
                        input.setAttribute('name', k);
                        input.setAttribute('value', v);
                        form.appendChild(input);
                    }
                    document.body.appendChild(form);
                    console.log('login_sm_helper.js: submit form');
                    form.submit();
                } else {
                    send_button.disabled = false;
                    send_button.style.backgroundColor = original_button_color;
                    confirm_button.disabled = false;
                    confirm_button.style.backgroundColor = original_button_color;
                    trust_checkbox_input.disabled = false;
                    sm_code_input.disabled = false;
                    sm_code_input.focus();
                }
            });
        }
    });
});
