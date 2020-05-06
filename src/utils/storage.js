/**
 * 本地存储
 */
import encrypt from './encrypt'
class Storage {
    constructor() {
        this.aesKey = 'c2v8vthjb7ojfa5u'; //aes加密key
        this.header = 'header';
        this.userInfo = 'userInfo';
        this.loginStatus = 'loginStatus';
        this.newBlogInfo = 'newBlogInfo';   // 新增博客
    }
    /**
     * 加密存储
     * @param {*} key
     * @param {*} value
     */
    encryptSet(key, value) {
        let val = value;
        if ((typeof value).toLocaleLowerCase() === 'object') {
            val = JSON.stringify(value);
        }
        let data = encrypt.aesEncrypt(val, this.aesKey);
        sessionStorage.setItem(key, data);
    }

    localEncryptSet(key, value) {
        let val = value;
        if ((typeof value).toLocaleLowerCase() === 'object') {
            val = JSON.stringify(value);
        }
        let data = encrypt.aesEncrypt(val, this.aesKey);
        localStorage.setItem(key, data);
    }
    /**
     * 解密获取
     * @param {*} key
     */
    decryptGet(key) {
        let localData = sessionStorage.getItem(key);
        let data =
            localData && encrypt.aesDecrypt(localData, this.aesKey);
        let result = '';
        try {
            result = JSON.parse(data);
        } catch (error) {
            result = data;
        }
        return result;
    }

    localDecryptGet(key) {
        let localData = localStorage.getItem(key);
        let data =
            localData && encrypt.aesDecrypt(localData, this.aesKey);
        let result = '';
        try {
            result = JSON.parse(data);
        } catch (error) {
            result = data;
        }
        return result;
    }
    /**
     * 设置本地的请求头信息
     * @param {存放的值} value
     */
    setRequestHeader(value) {
        this.encryptSet(this.header, value);
    }

    /**
     * 获取本地的请求头信息
     */
    getRequestHeader() {
        return this.decryptGet(this.header);
    }
    // /**
    //  * set session storage model
    //  */
    // setRequestHeader(value) {
    //     sessionStorage.setItem(this.header, JSON.stringify(value));
    // }
    // /**
    //  * get session storage model
    //  */
    // getRequestHeader(){
    //     return JSON.parse(sessionStorage.getItem(this.header) || '{}');
    // }
    /**
     * 存用户信息
    */
    setUserInfoSs(value) {
        this.encryptSet(this.userInfo, value);
        this.localEncryptSet(this.userInfo, value);
    }
    /**
     * 取用户信息
    */
    getUserInfoSs(){
        // return this.decryptGet(this.userInfo);
        return this.localDecryptGet(this.userInfo);
    }
    /**
     * 存用户登录状态
    */
    setLoginStatus(value) {
        this.encryptSet(this.loginStatus, value);
    }
    /**
     * 取用户登录状态
    */
    getLoginStatus(){
        return this.decryptGet(this.loginStatus);
    }
    /**
     * 存新增博客
    */
    setNewBlogInfo(value) {
        this.encryptSet(this.newBlogInfo, value);
    }
    /**
     * 取新增博客
    */
    getNewBlogInfo(){
        return this.decryptGet(this.newBlogInfo);
    }
}
export default new Storage();