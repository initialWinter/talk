(async function(){
    // 验证是否有登录，如果没有登录，跳转到登录页，如果有登录，获取到登录的用户信息

    const resp = await API.profile();
    const user = resp.data;
    console.log(user);
    if(!user){
        alert('未登录或登录已过期，请重新登录');
        location.href = './login.html';
        return;
    }
    // 下面是登录状态下的环境
    const doms = {
        aside:{
            nickname: $('#nickname'),  //昵称
            loginId: $('#loginId'),  //账号
        },
        close: $('.close'),  //关闭聊天 ×
        container: $('.chat-container'),  //聊天消息界面
        txtMsg: $('#txtMsg'),  //文本框
        msgContainer: $('.msg-container'),  //表单
    }

    setUserInfo();

    // 注销事件
    doms.close.onclick = function(){
        API.loginOut();
        location.href = './login.html';
    } 
    
    //加载历史记录
    await loadHistory();
    async function loadHistory(){
        const resp = await API.getHistory();
        // console.log(resp);
        for(const item of resp.data){
            console.log(item);
            addChat(item);
        }
        scrollBottom();
    }


    // 设置用户信息
    function setUserInfo(){
        doms.aside.nickname.innerText = user.nickname;
        doms.aside.loginId.innerText = user.loginId;
    }

    //添加消息到 div , 页面中
    /**
     * content:'你几岁啦？
     * createAt: '2022-04-29'
     * form: 'haha'
     * to: null
     */
    function addChat(chatInfo){
        //聊天语容器
        const div = $$$('div');
        div.classList.add('chat-item');
        if(chatInfo.from){
            div.classList.add('me');
        }
        //头像
        const img = $$$('img');
        img.classList.add('chat-avatar');
        img.src = chatInfo.from ? './asset/avatar.png' : './asset/robot-avatar.jpg'
        //聊天语
        const content = $$$('div');
        content.classList.add('chat-content');
        content.innerText = chatInfo.content;
        //聊天时间
        const data = $$$('div');
        data.classList.add('chat-date');
        data.innerText = formatData(chatInfo.createdAt);

        div.appendChild(img);
        div.appendChild(content);
        div.appendChild(data);
        doms.container.appendChild(div);
    }

    // addChat({
    //     content:'嘎嘎吧ahzdbf',
    //     createdAt: 1651213093992,
    //     from: 'vv',
    //     to: null,
    // })
    // addChat({
    //     content:'啥呀',
    //     createdAt: 165121309343,
    //     from: null,
    //     to: 'vv',
    // })

    function formatData(timestamp){
        const data = new Date(timestamp);
        const year = data.getFullYear();
        const month = (data.getMonth() + 1).toString().padStart(2, '0');
        const day = data.getDate().toString().padStart(2, 0);
        const hours = data.getHours().toString().padStart(2, 0);
        const minutes = data.getMinutes().toString().padStart(2, 0);
        const seconds = data.getSeconds().toString().padStart(2, 0);

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
   
    //历史消息回到最底部
    function scrollBottom(){
        // console.log(doms.container.scrollHeight);
        doms.container.scrollTop = doms.container.scrollHeight;
    }

    doms.msgContainer.onsubmit = function(e){
        e.preventDefault();  //阻止事件默认行为
        sendChat();
    }

    //发送消息
    async function sendChat(){
        const content = doms.txtMsg.value.trim();
        if(!content){
            return;
        }
        addChat({
            content,
            from: user.loginId,
            to: null,
            createdAt: Date.now(),
        })
        doms.txtMsg.value = '';
        scrollBottom();
        const resp = await API.sendChat(content);
        // console.log(resp);
        addChat({
            from: null,
            to: user.loginId,
            ...resp.data,
        })
        scrollBottom();

    }
    // window.sendChat = sendChat;
    // sendChat();

})()