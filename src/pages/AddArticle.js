import React,{useState,useEffect} from 'react';
import '../static/css/AddArticle.css'
import {Row,Col,Input,Select,Button,message} from 'antd'
import {withRouter} from 'react-router-dom';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import BlogRequest from '../requests/modules/blog'

const { Option } = Select
const { TextArea } = Input



const AddArticle = (props) => {
    const [articleId,setArticleId] = useState(0) //用于判断是否是新增博客，1表示新增博客，2表示不是新增博客
    const [articleTitle,setArticleTitle] = useState('')   //文章标题
    const [articleContent , setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd,setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml,setIntroducehtml] = useState('等待编辑') //简介的html内容
    // const [showDate,setShowDate] = useState('2020-01-14')   //发布日期
    // const [updateDate,setUpdateDate] = useState() //修改日志的日期
    const [typeInfo ,setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType,setSelectType] = useState('请选择分类') //选择的文章类别
    const [blogStatus,setblogStatus] = useState(1) //博客状态，1表示已发布，2表示暂存
    /**
     * marked && highlight
    */
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

    /**
     * 初始化，获取博客分类数据
    */
    useEffect(()=>{
        getBlogCategory()
        const tmpId = props.match.params._id
        setArticleId(tmpId)
        if(tmpId){
            getBlogDetail(tmpId)
        }
    },[props.match.params._id])

    /**
     * 四个方法，用于input,textarea,select的值变化时保存到useState中
    */
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
    const changeTitle = (e) => {
        setArticleTitle(e.target.value)
    }
    const changeCategory = (value) => {
        setSelectType(value)
    }

    /**
     * 获取博客分类
    */
    const getBlogCategory = () => {
        BlogRequest.getBlogCategoryRequest().then(res => {
            setTypeInfo(res.data)
        })
    }

    /**
     * 发布文章
    */
    const addBlog = (status) =>{
        let data = {
            _id:articleId,
            title:articleTitle,
            category:selectedType,
            hot:1,
            content:articleContent,
            brief:introducemd,
            status
        }
        if(selectedType==='请选择分类'){
            message.error('请选择分类')
            return
        }else if(articleTitle === ''){
            message.error('标题不能为空')
            return
        }else if(articleContent === ''){
            message.error('内容不能为空')
            return
        }
        // 新增的博客，没有暂存和发布过
        if(articleId===undefined || articleId===0 ){
            BlogRequest.addBlogRequest(data).then(res=>{
                if(res.data.code === 0){
                    if(status===1){
                        message.success('发布成功')
                        setTimeout(()=>{
                            props.history.push('/index/list/released')
                        },500)
                    }else{
                        message.success('暂存成功')
                        setTimeout(()=>{
                            props.history.push('/index/list/prepared')
                        },500)
                    }
                }else{
                    if(status===1){
                        message.error('发布失败')
                    }else{
                        message.error('暂存失败')
                    }
                }
            })
        }else{
            BlogRequest.updateBlogDetailRequest(data).then(res=>{
                if(res.data.code === 0){
                    if(status===1){
                        if(blogStatus===1){
                            message.success('更新成功')
                            setTimeout(()=>{
                                props.history.push('/index/list/released')
                            },500)
                        }else if(blogStatus===2){
                            message.success('发布成功')
                            setTimeout(()=>{
                                props.history.push('/index/list/released')
                            },500)
                        }
                        
                    }else{
                        message.success('暂存成功')
                        setTimeout(()=>{
                            props.history.push('/index/list/prepared')
                        },500)
                    }
                }else{ 
                    if(status===1){
                        if(blogStatus===1){
                            message.error('更新失败')
                        }else if(blogStatus===2){
                            message.error('发布失败')
                        }
                    }else{
                        message.error('暂存失败')
                    }
                }
            })
        }
    }

    /**
     * 获取博客详情
    */
    const getBlogDetail = (_id)=> {
        BlogRequest.getBlogDeatilRequest({_id}).then(res => {
            const {title,category,content,brief,status} = res.data[0];
            setArticleTitle(title)
            setArticleContent(content)
            setSelectType(category)
            setIntroducemd(brief)
            let mkdContent=marked(content)
            setMarkdownContent(mkdContent)
            let mkdBrief = marked(brief)
            setIntroducehtml(mkdBrief)
            setblogStatus(status)
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
                                size="large"
                                onChange={changeTitle}
                                value = {articleTitle}
                            />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select style={{ width:'95%' }} value={selectedType} size="large" onChange={changeCategory}>
                                {
                                    typeInfo.map((item,index)=>{
                                        return (
                                            <Option key={index} value={item.name}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                    <br/>
                    <Row gutter={10} >
                        <Col span={12}>
                            <TextArea 
                                className="markdown-content" 
                                rows={17}  
                                placeholder="文章内容"
                                onChange = {changeContent}
                                value = {articleContent}
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
                        <Col span={24}>
                            <br/>
                            <br/>
                            <br/>
                            <TextArea 
                                rows={4} 
                                placeholder="文章简介"
                                onChange = {changeIntroduce}
                                value = {introducemd}
                            />
                            <br/><br/>
                            <div  className="introduce-html" dangerouslySetInnerHTML={{__html:introducehtml}}></div>
                        </Col>
                        <Col span={10}>
                            <Button type="dashed" size="large" className="submit-btn" onClick={addBlog.bind(this,2)}>暂存文章</Button>
                        </Col>
                        <Col span={12}>
                            <Button type="primary" size="large" className="submit-btn" onClick={addBlog.bind(this,1)}>发布文章</Button>
                        </Col>
                        
                    </Row>
                </Col>
            </Row>
        </div>
    );
}

export default withRouter(AddArticle);
