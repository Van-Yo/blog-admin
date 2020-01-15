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
            blogAddBlogApi : this.baseUrl + '/blogList/addBlog',     // 新增博客
            blogGetBlogCategoryApi : this.baseUrl + '/category/getCategoryList',     // 获取博客分类
            blogGetBlogListApi : this.baseUrl + '/blogList/getBlogList'     // 获取博客列表
        };
        return apiList
    }
}
export default new Api()