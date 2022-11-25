import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import './WorkChart.css';

import * as React from 'react';

import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import dayjs from 'dayjs';

const url2fetch = "http://localhost:9443/intervals/getDailyWorkBetween?"

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

function BasicDatePicker(props) {
    const [value, setValue] = useState([
        dayjs(new Date()).toDate(),
        dayjs(new Date()).toDate(),
    ]);

    const onValueChange = (newVal)=>{
        console.log(newVal);
        setValue(newVal);
    }

    function GetNewIntervals(){
        //fetch with value
        console.log(value);

        const fetchOptions = {
            headers: {
              // 'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token') 
            },
            method: "GET",
            
            // body: JSON.stringify(values, null, 2)
          }
          // setSubmitting(true);
          
          // console.log(JSON.stringify(values, null, 2));
          fetch(url2fetch+new URLSearchParams({beginDate: value[0] ,endDate: value[1]}),fetchOptions).then((res)=>{
            console.log("Response came");
            // console.log(res.json());
            res.json().then((jres)=>{
              console.log(jres);
              
              if(res.status===400){
                console.log("Wrong email or password");
                // setErrorMessage(true);

                // alert("Wrong email or password!");
              }
              props.onIntervalsCome(jres);
              
              
            }).catch((err)=>{
              console.log(err);
            });
        });
            
        
    }

    useEffect(()=>{
        if((value[0])&&(value[1])){
            GetNewIntervals();
        }
        },[value]
    );


    return (
        <div style={{minWidth:200, width:"25%"}}>
      <DateRangePicker
        label="Choose Day Interval"
        placeholder="Pick dates range"
        value={value}
        onChange={setValue}
        maxDate={dayjs(new Date()).toDate()}
        maxLength={7}
        minLength={2}
        
        // onChange={setValue}
        
      />
      </div>
    );
  }
  

const WorkChart = (props)=>{
  const [histogramValues,setHistogramValues] = useState([0]);
    function onIntervalsCome(data){
      console.log("data"+ data.toString());
      const intervalsBetween = data.intervalsBetween;
      const timesPerDay = intervalsBetween.map((dailyData)=>{
        const dailySum = Object.values(dailyData).reduce((rv,x)=>{
          return rv + x/3600; //Convert to hours when summing
        },0)
        return dailySum;
      });
      
      console.log(timesPerDay);
      setHistogramValues(timesPerDay);
    }

    return (<div>
        <BasicDatePicker onIntervalsCome={onIntervalsCome}/>
        {/* <DynamicHistogram datas={[1,0.3,0.5,0.7]}/> */}
        <DynamicHistogram datas={histogramValues}/>
        </div>
    );
    
}

export default WorkChart;