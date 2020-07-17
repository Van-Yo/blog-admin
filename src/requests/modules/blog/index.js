import http from '../../../utils/http'
import Api from '../../urlConfig'

class BlogRequest{
    constructor(){
        this.apiList = Api.getApiList()
    }
    // 新增博客
    addBlogRequest(data){
        return http.post(this.apiList.blogAddBlogApi,data)
    }
    // 获取博客分类
    getBlogCategoryRequest(){
        return http.get(this.apiList.blogGetBlogCategoryApi)
    }
    // 获取博客列表
    getBlogListRequest(){
        return http.get(this.apiList.blogGetBlogListApi)
    }
    // 获取已发表博客列表
    getReleasedBlogListRequest(){
        return http.get(this.apiList.blogGetReleasedBlogListApi)
    }
    // 获取草稿博客列表
    getPreparedBlogListRequest(){
        return http.get(this.apiList.blogGetPreparedBlogListApi)
    }
    // 模糊查询博客
    getBlogListBySearchRequest(data){
        return http.get(this.apiList.blogFindBlogBySearchApi,data)
    }
    // 删除博客
    deleteBlogRequest(data){
        return http.get(this.apiList.blogDeleteBlogApi,data)
    }
    // 获取博客详情
    getBlogDeatilRequest(data){
        return http.get(this.apiList.blogGetBlogDeatilApi,data)
    }
    // 更新博客详情
    updateBlogDetailRequest(data){
        return http.post(this.apiList.blogUpdateBlogDeatilApi,data)
    }
    // 查找博客
    findBlogRequest(data){
        return http.get(this.apiList.blogFindBlogApi,data)
    }
    // 获取博客分类及对应数量
    getBlogCategoryListRequest(){
        return http.get(this.apiList.blogGetBlogCategoryListApi)
    }
    //按照分类获取已发表博客
    getBlogListByCategoryIdRequest(data){
        return http.get(this.apiList.blogGetBlogListByCategoryIdApi,data)
    }
    //按照分类获取已发表博客
    blogGetReleasedBlogNumberByMonthRequest(){
        return http.get(this.apiList.blogGetReleasedBlogNumberByMonthApi)
    }
}
export default new BlogRequest()