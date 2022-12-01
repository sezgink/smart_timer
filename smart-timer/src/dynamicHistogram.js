import { useEffect,useState } from "react";
import './dynamicHistogram.css';

const round2digits = (value)=>Math.round(value*100)/100;

const DynamicHistogram = (props)=>{
    const [histogramMult,setHistogramMult] = useState(0);
    const [normalizationCo,setNormalizationCo] = useState(1);
    useEffect(()=>{
        setHistogramMult(0);
        increaseMultImmediately();
        const max = Math.max.apply(null, props.datas);
        setNormalizationCo(1/max);
    },[props.datas]);

    const increaseMultImmediately = (lastVal) =>{
        setTimeout(()=>{
          setHistogramMult(1);
        },1);  
    }

    return(
        <div>
            <div className='workChartDiv'>
                {props.datas.map((item,index)=>{
                    // return(<div className='workChartBox' key={index} style={{width:30,height:200*item*histogramMult*normalizationCo,transition: 'height 0.7s ease-out'}}/>)
                    return(
                    <div className='workChartBox' key={index} style={{width:30}}>
                        <div className='workChartEmptyBox' style={{width:"100%",height:20}}><h3>{index}</h3></div>
                        <div className="workChartColoredBox" style={{width:"100%",height:200*item*histogramMult*normalizationCo,transition: 'height 0.7s ease-out'}}/>
                        <div className='workChartEmptyBox' style={{width:30,height:0}}><h3>{index}</h3></div>
                    </div>
                    )
                })}
            </div>
        </div>
    );
}

const DynamicHistogram2 = (props)=>{
    const [histogramMult,setHistogramMult] = useState(0);
    const [normalizationCo,setNormalizationCo] = useState(1);
    useEffect(()=>{
        setHistogramMult(0);
        increaseMultImmediately();
        // const max = Math.max.apply(null, props.datas);
        const max = props.datas.reduce((rv,x)=>{
            return (x.value>rv)? x.value : rv;
        },0);
        setNormalizationCo(1/max);
    },[props.datas]);

    const increaseMultImmediately = (lastVal) =>{
        setTimeout(()=>{
          setHistogramMult(1);
        },1);  
    }

    return(
        <div>
            <div className='workChartDiv'>
                {/* <div className='workChartColoredSideBox' style={{width:10,height:250,marginBottom:15}}/> */}
                {props.datas.map((item,index)=>{
                    return(
                    <div className='workChartBox' key={index} style={{width:30}}>
                        <div className='workChartEmptyBox' style={{width:30,height:50,marginBottom:-15,textAlign:"center",justifyContent:"center",alignItems:"center",display:"flex"}}><h4>{round2digits(item.value)}h</h4></div>
                        <div className="workChartColoredBox" style={{width:"100%",height:200*item.value*histogramMult*normalizationCo,transition: 'height 0.7s ease-out'}}/>
                        <div className='workChartEmptyBox'  style={{width:30,height:30,textAlign:"center",justifyContent:"center",alignItems:"center",display:"flex"}}><h4>{item.label}</h4></div>
                    </div>
                    )
                })}
                {/* <div style={{height:0,flexBasis:"100%"}}/>
                <div className='workChartColoredSideBox' style={{width:500,height:10,marginTop:-50}}/> */}
                
            </div>
            
        </div>
    );
}

const DynamicHistogram3 = (props)=>{
    const [histogramMult,setHistogramMult] = useState(0);
    const [normalizationCo,setNormalizationCo] = useState(1);
    useEffect(()=>{
        setHistogramMult(0);
        increaseMultImmediately();
        // const max = Math.max.apply(null, props.datas);
        const max = props.datas.reduce((rv,x)=>{
            return (x.value>rv)? x.value : rv;
        },0);
        setNormalizationCo(1/max);
    },[props.datas]);

    const increaseMultImmediately = (lastVal) =>{
        setTimeout(()=>{
          setHistogramMult(1);
        },1);  
    }

    return(
        <div>
            <div className='workChartDiv'>
                {/* <div className='workChartColoredSideBox' style={{width:10,height:250,marginBottom:15}}/> */}
                {props.datas.map((item,index)=>{
                    return(
                    <div className='workChartBox' key={index} style={{width:30}}>
                        <div className='workChartEmptyBox' style={{width:30,height:50,marginBottom:-15,textAlign:"center"}}><h3>{item.value}</h3></div>
                        <div className="workChartColoredBox" style={{width:"100%",height:200*item.value*histogramMult*normalizationCo,transition: 'height 0.7s ease-out'}}/>
                        <div className='workChartEmptyBox'  style={{width:30,height:0,textAlign:"center"}}><h3>{item.label}</h3></div>
                    </div>
                    )
                })}
                {/* <div style={{height:0,flexBasis:"100%"}}/>
                <div className='workChartColoredSideBox' style={{width:500,height:10,marginTop:-50}}/> */}
                
            </div>
            
        </div>
    );
}

export  {DynamicHistogram,DynamicHistogram2,DynamicHistogram3};