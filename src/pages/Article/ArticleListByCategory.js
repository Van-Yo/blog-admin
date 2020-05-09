import React,{useState,useEffect} from 'react'
import { Card , Row, Col } from 'antd';
import '../../static/css/ArticleListByCategory.css'
import BlogRequest from '../../requests/modules/blog'
const { Meta } = Card;

const ArticleListByCategory = (props) => {
    const [category ,setCategory] = useState([]) // 文章类别信息
    /**
     * 初始化，获取博客分类数据
    */
    useEffect(()=>{
        getBlogCategory()
    },[])
    /**
     * 获取博客分类
    */
    const getBlogCategory = () => {
        BlogRequest.getBlogCategoryRequest().then(res => {
            setCategory(res.data)
        })
    }
    /**
     * 分类跳转博客列表
    */
    const getBlogListByCategory = (id) => {
        props.history.push('/home/article/list/released/'+id)
    }
    return (
        <div className="article-list-by-category">
            <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}>
                {
                    category.map((item,index)=>{
                        return(
                            <Col key={index} className="gutter-row article-list-single" span={4} onClick={getBlogListByCategory.bind(this,item.id)}>
                                <div className="gutter-box">
                                    <Card
                                        hoverable
                                        cover={<img alt={item.name} src={item.imgSrc} />}
                                    >
                                        <Meta title={item.name} />
                                    </Card>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
            
        </div>
    )
}

export default ArticleListByCategory

