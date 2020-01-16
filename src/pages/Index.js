import React,{useState} from 'react'
import { Layout, Menu, Breadcrumb, Icon ,Avatar} from 'antd';
import '../static/css/AdminIndex.css';
import {Route,withRouter} from 'react-router-dom';
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
function Index(props) {
    const [collapsed,setCollapsed] = useState(false)
    const onCollapse = collapsed => {
        setCollapsed(collapsed)
    }
    const handleClickArticle = e=>{
      console.log(e.item.props)
      if(e.key==='addArticle'){
        props.history.push('/index/add')
      }else{
        props.history.push('/index/list')
      }
  
    }

    return (
        <Layout style={{ minHeight: '100vh',height:'100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" >
              <Avatar size={100} src="http://139.224.227.52/image/joker-logo.png"  />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span>工作台</span>
                </Menu.Item>
                <Menu.Item key="2">
                <Icon type="desktop" />
                <span>添加文章</span>
                </Menu.Item>
                <SubMenu
                key="sub1"
                onClick={handleClickArticle}
                title={
                    <span>
                    <Icon type="user" />
                    <span>文章管理</span>
                    </span>
                }
                >
                <Menu.Item key="addArticle">添加文章</Menu.Item>
                <Menu.Item key="articleList">文章列表</Menu.Item>
                </SubMenu>
                <Menu.Item key="9">
                <Icon type="file" />
                <span>留言管理</span>
                </Menu.Item>
            </Menu>
            </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,height:0}} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <div>
                <Route path='/index/add/' exact>
                  <AddArticle/>
                </Route>
                <Route path='/index/add/:_id'>
                  <AddArticle/>
                </Route>
                <Route path='/index/list/'>
                  <ArticleList/>
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
