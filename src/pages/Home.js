import React,{useState} from 'react'
import '../static/css/Home.css';

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
            <input className="switch switch-anim" onChange={()=>{checkNum()}} type="checkbox" />
        </div>
    );
}

export default Home;
