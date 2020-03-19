/**
 * 本地存储
 */
class Storage {
    constructor() {
        this.header = 'header';
        this.userInfo = 'userInfo';
        this.loginStatus = 'loginStatus';
    }
    /**
     * set session storage model
     */
    setRequestHeader(value) {
        sessionStorage.setItem(this.header, JSON.stringify(value));
    }
    /**
     * get session storage model
     */
    getRequestHeader(){
        return JSON.parse(sessionStorage.getItem(this.header) || '{}');
    }
    /**
     * 存用户信息
    */
    setUserInfoSs(value) {
        sessionStorage.setItem(this.userInfo, JSON.stringify(value));
    }
    /**
     * 取用户信息
    */
    getUserInfoSs(){
        return JSON.parse(sessionStorage.getItem(this.userInfo) || '{}');
    }
    /**
     * 存用户登录状态
    */
    setLoginStatus(value) {
        sessionStorage.setItem(this.loginStatus, JSON.stringify(value));
    }
    /**
     * 取用户登录状态
    */
    getLoginStatus(){
        return JSON.parse(sessionStorage.getItem(this.loginStatus) || '');
    }
}
export default new Storage();