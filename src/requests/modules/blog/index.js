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
}
export default new BlogRequest()