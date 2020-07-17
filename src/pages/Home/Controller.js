import React,{memo,useEffect} from 'react'
import '../../static/css/Home.css';
import {  Row, Col  } from 'antd';
import BlogRequest from '../../requests/modules/blog'
import '../../static/css/Controller.css';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入饼图
import  'echarts/lib/chart/pie';
// 引入折线
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
const Home = () => {
    // const [defaultAdd,setDefaultAdd] = useState(false)
    useEffect(()=>{
        getPieEchartsData();
        getLineEchartsData();
    },[])
    // let checkNum = ()=>{
    //     console.log(defaultAdd)
    //     // if($('.switch-anim').prop('checked')){
    //     //     console.log("选中");
    //     // }else{
    //     //     console.log("没选中");
    //     // }
    //     setDefaultAdd(!defaultAdd);
    //     console.log(defaultAdd)
    // }

    // 博客分类统计，饼状图
    let getPieEchartsData = () => {
        BlogRequest.getBlogCategoryListRequest().then(res=>{
            let pieChart = echarts.init(document.getElementById('pie-main'));
            let pieConfig = {
                title: { text: '博客分类统计' },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}: {c}篇 (占比{d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 2,
                    top:32,
                    data: res.data.categoryList
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data: res.data.blogNumberObj
                    }
                ]
            }
            pieChart.setOption(pieConfig);
        })
    }
    // 博客发表统计，线状图
    let getLineEchartsData = () => {
        BlogRequest.blogGetReleasedBlogNumberByMonthRequest().then(res=>{
            console.log(res)
            let lineChart = echarts.init(document.getElementById('line-main'));
            // 绘制图表
            
            lineChart.setOption({
                title: { text: '博客发表统计' },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}月: {c} 篇'
                },
                xAxis: {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '访问来源',
                    data: res.data,
                    type: 'line'
                }]
            })
        })
        
    }
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <div id="pie-main"></div>
                    {/* <Statistic title="点赞数" value={1128} prefix={<Icon type="like" style={{color:'rgba(0,0,0,.25)'}} />} /> */}
                </Col>
                <Col span={12}>
                    {/* <Statistic title="访问量" value={1128} prefix={<Icon type="eye" style={{color:'rgba(0,0,0,.25)'}} />} /> */}
                    <div id="line-main"></div>
                </Col>
            </Row>
            {/* <input className="switch switch-anim" onChange={()=>{checkNum()}} type="checkbox" /> */}
            
        </div>
    );
}

export default memo(Home);
