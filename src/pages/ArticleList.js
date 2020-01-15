import React,{useState,useEffect} from 'react';
import BlogRequest from '../requests/modules/blog'
import '../static/css/ArticleList.css'
import { List ,Row ,Col , Modal ,message ,Button,Switch} from 'antd';
import axios from 'axios'
const { confirm } = Modal;


function ArticleList(props){

    const [list,setList]=useState([])
    useEffect(()=>{
        getList()
    },[])
    const getList = () => {
        BlogRequest.getBlogListRequest().then(res => {
            setList(res.data);
        })
    }
    return (
        <div>
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
                              <Button type="primary" >修改</Button>&nbsp;

                              <Button >删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
                />

        </div>
    )

}

export default ArticleList