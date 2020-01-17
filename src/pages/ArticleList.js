import React,{useState,useEffect} from 'react';
import BlogRequest from '../requests/modules/blog'
import {withRouter} from 'react-router-dom';
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Input } from 'antd';
const { Search } = Input;
const { confirm } = Modal;


function ArticleList(props){

    const [list,setList]=useState([])
    useEffect(()=>{
        let tempStatus = props.match.params.status
        getList(tempStatus)
    },[props.match.params.status])
    const getList = (tempStatus) => {
        if(tempStatus==='released'){
            BlogRequest.getReleasedBlogListRequest().then(res => {
                setList(res.data);
            })
        }else if(tempStatus==='prepared'){
            BlogRequest.getPreparedBlogListRequest().then(res => {
                setList(res.data);
            })
        }
    }
    const deleteBlog = (_id) => {
        confirm({
            title:'确定要删除这篇博客文章吗?',
            content:'如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk(){
                BlogRequest.deleteBlogRequest({_id}).then(res=>{
                    console.log(res)
                    message.success('文章删除成功')
                    getList()
                })
            },
            onCancel(){
                return
            }
        })
    }

    const goToBlogDetail = (_id) => {
        props.history.push('/index/add/'+_id)
    }

    const findBlog = (value) => {
        let status = ''
        if(props.match.params.status === 'released'){
            status = 1
        }else{
            status = 2
        }
        BlogRequest.getBlogListBySearchRequest({searchString:value,status:status}).then(res=>{
            setList(res.data);
        })
    }

    return (
        <div>
            <Row type="flex" justify="end">
                <Col span={6}>
                    <Search 
                        placeholder="input search text" 
                        onSearch={value => findBlog(value)} 
                        enterButton 
                    />
                    <br />
                    <br />
                </Col>
            </Row> 
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>

                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.category}
                            </Col>
                            <Col span={4}>
                                {item.date}
                            </Col>
                            <Col span={4}>
                              {item.hot}
                            </Col>

                            <Col span={4}>
                              <Button type="primary" onClick={goToBlogDetail.bind(this,item._id)} >修改</Button>&nbsp;

                              <Button onClick={deleteBlog.bind(this,item._id)}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default withRouter(ArticleList)