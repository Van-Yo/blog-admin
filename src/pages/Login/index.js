import React,{useState,useEffect} from 'react'
import 'antd/dist/antd.css';
import { Card, Input, Icon,Button ,Spin ,message } from 'antd';
import '../../static/css/Login.css';
import {withRouter} from "react-router-dom";
import UserRequest from '../../requests/modules/user'
import Storage from '../../utils/storage'

function Login(props) {
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // 接口获取登录状态，如果已登录，则跳转到首页
    useEffect(()=>{
        UserRequest.userIsLoginRequest().then(res=> {
            if(res.data.code===1){
                props.history.push('/home');
            }
          })
    },[props.history])

    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName.trim()){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return
        }
        UserRequest.userLoginRequest({
            us: userName,
            ps: password
        }).then(res=>{
            if(res.data.code === 0){
                Storage.setUserInfoSs(res.data.data[0]);
                // Storage.setLoginStatus(true);
                setIsLoading(false)
                props.history.push('/home')
            }else{
                message.error('用户名或者密码错误')
                setTimeout(()=>{
                    setIsLoading(false)
                },500)
            }
        })
    }
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="CrazyCoder Blog System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<Icon type="user" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>
                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
            </div>
    )
}
export default withRouter(Login)