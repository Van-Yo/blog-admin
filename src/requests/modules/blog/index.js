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
}
export default new BlogRequest()