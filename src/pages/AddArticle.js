import React,{useState} from 'react';
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,DatePicker} from 'antd'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import axios from 'axios'

const { Option } = Select
const { TextArea } = Input



const AddArticle = () => {
    const [articleId,setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate,setShowDate] = useState('2020-01-14')   //发布日期
    const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState(1) //选择的文章类别

    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: function (code) {
                return hljs.highlightAuto(code).value;
        }

    }); 

    const changeContent = (e) => {
        setArticleContent(e.target.value)
        let html=marked(e.target.value)
        setMarkdownContent(html)
    }

    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        let html = marked(e.target.value)
        setIntroducehtml(html)
    }

    const addBlog = () =>{
        let data = {
            'title':markdownContent,
            'category':selectedType,
            'hot':0,
            'content':articleContent,
            'brief':introducemd,
            'date':showDate
        }
        axios.post('http://localhost:3100/blogList/addBlog',data,{
            headers:{
				'Content-Type':'application/x-www-form-urlencoded'
			}
          }).then(res=>{
            console.log(res)
        })
    }

    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10} >
                        <Col span={20}>
                            <Input 
                                placeholder="博客标题" 
                                size="large" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select defaultValue="Sign Up" size="large">
                                <Option value="Sign Up">视频教程</Option>
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea 
                                className="markdown-content" 
                                rows={35}  
                                placeholder="文章内容"
                                onChange = {changeContent}
                                />
                        </Col>
                        <Col span={12}>
                            <div 
                                className="show-html"
                                dangerouslySetInnerHTML = {{__html:markdownContent}}
                            >

                            </div>

                        </Col>
                    </Row>  
                </Col>

                <Col span={6}>
                    <Row>
                        <Row type="flex" justify="space-between">
                            <Col span={12}>
                                <div className="date-select">
                                    <DatePicker
                                        placeholder="发布日期"
                                        size="large"
                                    />
                                </div>
                            </Col>
                            
                            <br/>
                        </Row>
                        <Col span={24}>
                            <br/>
                            <TextArea 
                                rows={4} 
                                placeholder="文章简介"
                                onChange = {changeIntroduce}
                            />
                            <br/><br/>
                            <div  className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={10}>
                            <Button type="dashed" size="large" className="submit-btn">暂存文章</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" size="large" className="submit-btn" onClick={addBlog}>发布文章</Button>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default AddArticle;
