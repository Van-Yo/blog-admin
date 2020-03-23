import React,{useState,useEffect} from 'react';
import BlogRequest from '../../requests/modules/blog'
import {withRouter} from 'react-router-dom';
import '../../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Input } from 'antd';
const { Search } = Input;
const { confirm } = Modal;


function ArticleList(props){
    // console.log(props)
    const [list,setList]=useState([])
    useEffect(()=>{
        let tempStatus = props.match.params.status
        getList(tempStatus)
    },[props.match.params.status])
    const getList = (tempStatus) => {
        if(tempStatus === 'released'){
            BlogRequest.getReleasedBlogListRequest().then(res => {
                setList(res.data);
            })
        }else if(tempStatus === 'prepared'){
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
                    if(res.data.code===0){
                        message.success('文章删除成功')
                    }
                    getList(props.match.params.status)
                })
            },
            onCancel(){
                return
            }
        })
    }

    const goToBlogDetail = (_id) => {
        props.history.push('/home/article/edit/'+_id)
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

    const addBlog = (item) => {
        let data = {
            _id:item._id,
            title:item.title,
            category:item.category,
            hot:1,
            content:item.content,
            brief:item.brief,
            status:1
        }
        
        confirm({
            title:'确定要发布这篇博客文章吗?',
            content:'如果你点击OK按钮，文章将会被发布。',
            onOk(){
                BlogRequest.updateBlogDetailRequest(data).then(res => {
                    if(res.data.code === 0){
                        message.success('发布成功')
                        props.history.push('/home/article/list/released')
                    }else{
                        message.error('发布失败')
                        return false
                    }
                })
            },
            onCancel(){
                return
            }
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
                            <b>最新修改或发布时间</b>
                        </Col>

                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={5}>
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
                            <Col span={3}>
                              {item.hot}
                            </Col>

                            <Col span={5}>
                                {
                                    props.match.params.status === 'prepared' && 
                                    <Button type="primary" onClick={addBlog.bind(this,item)}>发布</Button>
                                }
                                
                                &nbsp;<Button onClick={goToBlogDetail.bind(this,item._id)} >修改</Button>&nbsp;

                                <Button type="danger" onClick={deleteBlog.bind(this,item._id)}>删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default withRouter(ArticleList)