//用户登录和注册的表单项验证的通用代码
/**
 * 对某一个表单项进行验证的构造函数
 */

//类 构造函数
class FieldValidator {
    /**
     * 构造器   Validator验证器
     * @param {string} txtId 文本框的Id
     * @param {function} Validatorfunc 验证规则函数，当需要对该文本框进行验证时，会调用该函数 函数的参数为当前文本框的值，函数的返回值为验证的错误消息，若没有返回，则表示无错误。
     */
    constructor(txtId, ValidatorFunc){
        this.input = $('#'+ txtId);
        this.p = this.input.nextElementSibling;
        this.ValidatorFunc = ValidatorFunc;
        // console.log(this.input, this.p);
        // 失去焦点
        this.input.onblur = () => {
            this.validate();
        }; //验证函数

        /**
         * 验证成功返回true 失败返回false
         */
    }
    async validate() {
        // console.log('验证');
        const err = await this.ValidatorFunc(this.input.value);
        if(err){
            this.p.innerText = err;
            return false;
        }else{
            this.p.innerText = '';
            return true;
        }
    }

    /**
     * 对传入的所有验证器进行统一的验证，如果所有的验证均通过，则返回true，否则返回false
     * @param {FieldValidator[]} validators
     */
    //静态方法
    static async validate(...validators){
        const proms = validators.map(item => item.validate());
        const result = await Promise.all(proms);
        return result.every(r => r);
    }
}


// function test(){
//     FieldValidator.validate(loginIdValidator, nicknameValidator).then(
//         (result) => {
//             console.log(result);
//         }
//     );
// }