import React,{useState,useEffect} from 'react'
import { Layout, Menu, Breadcrumb, Icon ,Avatar} from 'antd';
import '../static/css/AdminIndex.css';
import {Route,withRouter} from 'react-router-dom';
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import Reviews from './Reviews'
import Home from './Home'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Index(props) {

    const [collapsed,setCollapsed] = useState(false)
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
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>文章管理</Breadcrumb.Item>
              <Breadcrumb.Item>{props.history.location.pathname === '/index/add' && '添加文章'}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.history.location.pathname === '/index/list/released' && '文章列表'}</Breadcrumb.Item>
              <Breadcrumb.Item>{props.history.location.pathname === '/index/list/prepared' && '草稿箱'}</Breadcrumb.Item>
            </Breadcrumb>
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
