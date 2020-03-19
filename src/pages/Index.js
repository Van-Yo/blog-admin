import React,{useState,useEffect} from 'react'
import { Row, Col , Layout, Menu, Breadcrumb, Icon ,Avatar} from 'antd';
import '../static/css/AdminIndex.css';
import {Route,withRouter} from 'react-router-dom';
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Reviews from './Reviews'
import Home from './Home'
import Storage from '../utils/storage'
import UserRequest from '../requests/modules/user'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Index(props) {
    const userInfo = Storage.getUserInfoSs();
    const [collapsed,setCollapsed] = useState(false)
    const [isLoginState,setIsLoginState] = useState()
    useEffect(()=>{
      let loginState = Storage.getLoginStatus()
      setIsLoginState(loginState)
    },[Storage.getLoginStatus()])
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const handleClickArticle = e=>{
      if(e.key==='/index/add'){
        props.history.push('/index/add')
      }else if(e.key==='/index/list/released'){
        props.history.push('/index/list/released')
      }else if(e.key==='/index/list/prepared'){
        props.history.push('/index/list/prepared')
      }else if(e.key==='/index'){
        props.history.push('/index')
      }else if(e.key==='/index/reviews'){
        props.history.push('/index/reviews')
      }
  
    }
    const login = ()=>{
      props.history.push('/')
    }

    const loginOut = ()=> {
      UserRequest.userLogoutRequest().then((res)=>{
        console.log(res);
        if(res.data.code === 0){
          Storage.setLoginStatus(false)
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
                <Menu.Item key="/index">
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
                  <Menu.Item key="/index/add">添加文章</Menu.Item>
                  <Menu.Item key="/index/list/released">文章列表</Menu.Item>
                  <Menu.Item key="/index/list/prepared">草稿箱</Menu.Item>
                </SubMenu>
                <Menu.Item key="/index/reviews">
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
                  <Breadcrumb.Item>{props.history.location.pathname === '/index' && '工作台'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname.indexOf('/index/') !== -1 && '文章管理'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/index/add' && '添加文章'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/index/list/released' && '文章列表'}</Breadcrumb.Item>
                  <Breadcrumb.Item>{props.history.location.pathname === '/index/list/prepared' && '草稿箱'}</Breadcrumb.Item>
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
                <Route path='/index' exact>
                  <Home/>
                </Route>
                <Route path='/index/add/' exact>
                  <AddArticle/>
                </Route>
                <Route path='/index/add/:_id'>
                  <AddArticle/>
                </Route>
                <Route path='/index/list/:status'>
                  <ArticleList/>
                </Route>
                <Route path='/index/reviews' exact>
                  <Reviews/>
                </Route>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>React hooks && Antd UI</Footer>
        </Layout>
      </Layout>
    )
}
export default withRouter(Index)
