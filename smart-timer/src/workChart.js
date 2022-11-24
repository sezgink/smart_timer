import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import './WorkChart.css';



// const DynamicHistogram = (props)=>{
//     return(
//         <div className='workChartDiv'>
//             <div className='workChartBox' style={{width:30,height:200}}/>
//             <div className='workChartBox' style={{width:30,height:200*0.3}}/>
//             <div className='workChartBox' style={{width:30,height:200*0.5}}/>
//         </div>
//     );
// }
const DynamicHistogram = (props)=>{
    const [histogramMult,setHistogramMult] = useState(0);
    useEffect(()=>{
        setHistogramMult(0);
        increaseMultImmediately();
    },[props.datas]);

    useEffect(()=>{
        
    });

    const increaseMultImmediately = (lastVal) =>{
        // setHistogramMult(histogramMult=>histogramMult+0.1);
        setHistogramMult(1);
    }

    return(
        <div>
            <div className='workChartDiv'>
                {props.datas.map((item,index)=>{
                    return(<div className='workChartBox' key={index} style={{width:30,height:200*item*histogramMult,transition: 'height 0.7s ease-out'}}/>)
                })}


            </div>
            <div className='workChartBottom'>
            {props.datas.map((item,index)=>{
                    return(<div className='workChartEmptyBox' key={index} style={{width:30,height:0}}><h3>{index}</h3></div>)
                })}
            </div>
        </div>
    );
}

const WorkChart = (props)=>{

    return (<div>
        <DynamicHistogram datas={[1,0.3,0.5,0.7]}/>
        </div>
    );
    
}

export default WorkChart;