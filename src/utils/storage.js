/**
 * 本地存储
 */
class Storage {
    constructor() {
        this.header = 'header';
        this.userInfo = 'userInfo'
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
}
export default new Storage();