import http from '../../../utils/http'
import Api from '../../urlConfig'

class UserRequest{
    constructor(){
        this.apiList = Api.getApiList()
    }
    // 用户登录
    userLoginRequest(data){
        return http.post(this.apiList.userLoginApi,data)
    }
}
export default new UserRequest()