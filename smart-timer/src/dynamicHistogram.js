import { useEffect,useState } from "react";

const DynamicHistogram = (props)=>{
    const [histogramMult,setHistogramMult] = useState(0);
    const [normalizationCo,setNormalizationCo] = useState(1);
    useEffect(()=>{
        setHistogramMult(0);
        increaseMultImmediately();
        const max = Math.max.apply(null, props.datas);
        setNormalizationCo(1/max);
    },[props.datas]);

    useEffect(()=>{
        
    });

    const increaseMultImmediately = (lastVal) =>{
        // setHistogramMult(histogramMult=>histogramMult+0.1);
        // setHistogramMult(1);
        setTimeout(()=>{
          setHistogramMult(1);
        },1);  
    }

    return(
        <div>
            <div className='workChartDiv'>
                {props.datas.map((item,index)=>{
                    return(<div className='workChartBox' key={index} style={{width:30,height:200*item*histogramMult*normalizationCo,transition: 'height 0.7s ease-out'}}/>)
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

export default DynamicHistogram;