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
            blogGetBlogListApi : this.baseUrl + '/blogList/getBlogList',     // 获取博客列表
            blogDeleteBlogApi : this.baseUrl + '/blogList/deleteBlog',     // 删除博客
            blogGetBlogDeatilApi : this.baseUrl + '/blogList/blogDetail',     // 获取博客详情
            blogUpdateBlogDeatilApi : this.baseUrl + '/blogList/updateBlog'     // 更改博客详情
        };
        return apiList
    }
}
export default new Api()