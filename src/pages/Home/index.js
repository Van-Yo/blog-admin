import React,{useState,useEffect} from 'react'
import { Row, Col , Layout, Menu, Breadcrumb, Icon ,Avatar} from 'antd';
import '../../static/css/AdminIndex.css';
import {withRouter} from 'react-router-dom';
import Storage from '../../utils/storage'
import UserRequest from '../../requests/modules/user'
import { renderRoutes } from 'react-router-config'
import { message } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Index(props) {
    // console.log(props.history.location.pathname)
    const userInfo = Storage.getUserInfoSs();   // 本地获取个人信息
    const [collapsed,setCollapsed] = useState(false);   // 控件闭合开关
    const [isLoginState,setIsLoginState] = useState();    // 登录状态
    useEffect(()=>{
        // 接口获取登录状态，如果未登录，则跳转到登录页
        UserRequest.userIsLoginRequest().then(res=> {
          if(res.data.code===-99){
            message.error('请重新登录');
            setIsLoginState(false)
            setTimeout(() => {
              props.history.push('/login');
            }, 500);
          }else{
            setIsLoginState(true)
            if(props.location.pathname === '/home'){
                props.history.push('/home/controller')
            }
          }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.location])
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const handleClickArticle = e=>{
      props.history.push(e.key)
  
    }
    const login = ()=>{
      props.history.push('/')
    }

    const loginOut = ()=> {
      UserRequest.userLogoutRequest().then((res)=>{
        if(res.data.code === 0){
          sessionStorage.removeItem('loginStatus');
          sessionStorage.removeItem('userInfo');
          props.history.push('/')
        }
      })
      
    }

    return (
        <Layout style={{ minHeight: '100vh',height:'100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" >
              <Avatar size={100} src="http://139.224.227.52/image/joker-logo.png"  />
            </div>
            <Menu onClick={handleClickArticle} theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={[props.history.location.pathname]}>
                <Menu.Item key="/home/controller">
                  <Icon type="pie-chart" />
                  <span>工作台</span>
                </Menu.Item>
                <SubMenu
                  key="sub1"
                  title={
                      <span>
                      <Icon type="file" />
                      <span>文章管理</span>
                      </span>
                  }
                >
                  <Menu.Item key="/home/article/add">添加文章</Menu.Item>
                  <Menu.Item key="/home/article/classifiedByCategory">文章分类</Menu.Item>
                  <Menu.Item key="/home/article/list/released/0">文章列表</Menu.Item>
                  <Menu.Item key="/home/article/list/prepared/0">草稿箱</Menu.Item>
                </SubMenu>
                <Menu.Item key="/home/reviews">
                  <Icon type="message" />
                  <span>留言管理</span>
                </Menu.Item>
            </Menu>
            </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,height:0}} />
          <Content style={{ margin: '0 16px' }}>
              
            <Row type="flex" justify="space-between" align="bottom">
              <Col span={4}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>{props.history.location.pathname === '/home/controller' && '工作台'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname.indexOf('/home/article') !== -1 && '文章管理'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/home/article/add' && '添加文章'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname.includes('/home/article/list/released') && '文章列表'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/home/article/list/prepared/0' && '草稿箱'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/home/reviews' && '留言管理'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/home/article/classifiedByCategory' && '文章分类'}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col span={8}>
                {/* 判断用户是否登录 */}
                <div className="icons-list"  style={{ margin: '16px 0',textAlign:'right' }}>
                  {
                    !isLoginState && <div><span>请登录！</span><div className="login-and-out" onClick={login}><Icon type="login" style={{ margin: '0 8px'}}/>登录</div></div>
                  }
                  {
                    isLoginState && <div><span>您好啊！{userInfo.us}</span><div className="login-and-out" onClick={loginOut}><Icon type="logout" style={{ margin: '0 8px'}} />注销</div></div>
                  }
                </div>
              </Col>
            </Row>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                {/* 第二层路由判断，'/home/controller' or '/home/article' or /home/reviews */}
                {renderRoutes(props.route.route)}
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>React hooks && Antd UI</Footer>
        </Layout>
      </Layout>
    )
}
export default withRouter(Index)
