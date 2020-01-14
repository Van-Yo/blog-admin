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
}
export default new BlogRequest()