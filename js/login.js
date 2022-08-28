//账号
const loginIdValidator = new FieldValidator('txtLoginId', async function(val){
    if(!val){
        return '请填写账号';
    }
})

//密码
const loginPwdValidator = new FieldValidator('txtLoginPwd',  function(val){
    if(!val){
        return '请填写密码';
    }
})

const form = $('.user-form');

form.onsubmit = async function(e){
    e.preventDefault();  //阻止事件默认行为
    const result = await FieldValidator.validate(
        loginIdValidator,
        loginPwdValidator,
    );
    if(!result){
        return //验证未通过
    } 
    const formData = new FormData(form); //// 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());  //es6内容
  
    const resp = await API.login(data);
    if (resp.code === 0) {
      alert('登录成功，点击确定，跳转到首页');
      location.href = './index.html';
    }else{
      loginPwdValidator.p.innerText = '账号或密码错误';
      loginPwdValidator.input.value = '';
    }

}