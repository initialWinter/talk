//账号
const loginIdValidator = new FieldValidator('txtLoginId', async function(val){
    if(!val){
        return '请填写账号';
    }
    const resp = await API.exists(val);
    // console.log(resp)
    if(resp.data){
        return '该账号已被占用，请重新选择一个账号'
    }
    
})
//昵称
const nicknameValidator = new FieldValidator('txtNickname',  function(val){
    if(!val){
        return '请填写昵称';
    }
})

//密码
const loginPwdValidator = new FieldValidator('txtLoginPwd',  function(val){
    if(!val){
        return '请填写密码';
    }
})
//确认密码
const loginPwdConfirmValidator = new FieldValidator('txtLoginPwdConfirm',  function(val){
    if(!val){
        return '请再次填写密码';
    }
    if(val !== loginPwdValidator.input.value){
        return '两次填写密码不一致';
    }
})

const form = $('.user-form');

form.onsubmit = async function(e){
    e.preventDefault();  //阻止事件默认行为
    const result = await FieldValidator.validate(
        loginIdValidator,
        nicknameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    );
    if(!result){
        return //验证未通过
    } 
    const formData = new FormData(form);    // 传入表单dom，得到一个表单数据对象
    const data = Object.fromEntries(formData.entries());  //es6内容
  
    const resp = await API.reg(data);
    if (resp.code === 0) {
      alert('注册成功，点击确定，跳转到登录页');
      location.href = './login.html';
    }
}