import React,{useState} from 'react'
import '../static/css/Home.css';
import { Statistic, Row, Col ,Icon } from 'antd';

const Home = () => {
    const [defaultAdd,setDefaultAdd] = useState(false)
    let checkNum = ()=>{
        console.log(defaultAdd)
        // if($('.switch-anim').prop('checked')){
        //     console.log("选中");
        // }else{
        //     console.log("没选中");
        // }
        setDefaultAdd(!defaultAdd);
        console.log(defaultAdd)
    }
    return (
        <div>
            <Row gutter={16}>
                <Col span={12}>
                    <Statistic title="点赞数" value={1128} prefix={<Icon type="like" style={{color:'rgba(0,0,0,.25)'}} />} />
                </Col>
                <Col span={12}>
                    <Statistic title="访问量" value={1128} prefix={<Icon type="eye" style={{color:'rgba(0,0,0,.25)'}} />} />
                </Col>
            </Row>,
            <input className="switch switch-anim" onChange={()=>{checkNum()}} type="checkbox" />
        </div>
    );
}

export default Home;
