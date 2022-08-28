 
function $(select){
    return document.querySelector(select);
}
function $$(select){
    return document.querySelectorAll(select);
}
function $$$(target){
    return document.createElement(target);
}
 
 
// const doms = {
//     txtLoginId: $('#txtLoginId'),
//     txtNickname: $('#txtNickname'),
//     txtLoginPwd: $('#txtLoginPwd'),
//     txtLoginPwdConfirm: $('#txtLoginPwdConfirm'),
//     submit: $('.submit'),
// }

// // doms.submit.onclick = function(){}
//     const txtLoginId = doms.txtLoginId.value,
//     txtNickname = doms.txtNickname.value,
//     txtLoginPwd = doms.txtLoginPwd.value,
//     txtLoginPwdConfirm = doms.txtLoginPwdConfirm.value;

//     const obj = {
//        txtLoginId,
//        txtNickname,
//        txtLoginPwd,
//        txtLoginPwdConfirm,
    //     }