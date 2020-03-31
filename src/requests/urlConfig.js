/**
 * 接口类
 */
class Api {
    constructor(){
        this.baseUrl = 'http://139.224.227.52:8088/api'
        // this.baseUrl = 'http://localhost:3300'
    }
    getApiList(){
        let apiList = {
            userLoginApi : this.baseUrl + '/user/login',    //用户登录
            userLogoutApi : this.baseUrl + '/user/logout',    //用户登出
            blogAddBlogApi : this.baseUrl + '/blogList/addBlog',     // 新增博客
            blogGetBlogCategoryApi : this.baseUrl + '/category/getCategoryList',     // 获取博客分类
            blogGetBlogListApi : this.baseUrl + '/blogList/getBlogList',     // 获取博客列表
            blogGetReleasedBlogListApi : this.baseUrl + '/blogList/getReleasedBlogList',     // 获取已发布博客列表
            blogGetPreparedBlogListApi : this.baseUrl + '/blogList/getPreparedBlogList',     // 获取草稿博客列表
            blogDeleteBlogApi : this.baseUrl + '/blogList/deleteBlog',     // 删除博客
            blogGetBlogDeatilApi : this.baseUrl + '/blogList/blogDetail',     // 获取博客详情
            blogUpdateBlogDeatilApi : this.baseUrl + '/blogList/updateBlog',     // 更改博客详情
            blogFindBlogApi : this.baseUrl + '/blogList/findBlog',       // 查找博客
            blogFindBlogBySearchApi : this.baseUrl + '/blogList/findBlogBySearch'       // 模糊查询博客
        };
        return apiList
    }
}
export default new Api()