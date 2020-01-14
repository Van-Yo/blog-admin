/**
 * 接口类
 */
class Api {
    constructor(){
        this.baseUrl = 'http://localhost:3100'
    }
    getApiList(){
        let apiList = {
            userLoginApi : this.baseUrl + '/user/login',    //用户登录
            blogAddBlogApi : this.baseUrl + '/blogList/addBlog'     // 新增博客
        };
        return apiList
    }
}
export default new Api()