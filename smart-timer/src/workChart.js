import { height } from '@mui/system';
import { useEffect, useState } from 'react';
import './WorkChart.css';

import * as React from 'react';

import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import dayjs from 'dayjs';

import {DynamicHistogram2} from './dynamicHistogram';

const url2fetch = "http://localhost:9443/intervals/getDailyWorkBetween?"

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function getMinDate(datesArr){
  // const minDate = Math.min.apply(null,datesArr);
  let minDate=null;
  datesArr.forEach(element => {
    if(!minDate){
      minDate=element;
      return;
    }

    if(element<minDate){
      minDate=element;
    }
    
  });


  console.log(minDate);
  return minDate;
}

function BasicDatePicker(props) {
    const [value, setValue] = useState([
        dayjs(new Date()).toDate(),
        dayjs(new Date()).toDate(),
    ]);

    const [choosing,setChooising]= useState(false);

    useEffect(()=>{
      if(!value[1]){
        setChooising(true);
      } else {
        setChooising(false);
      }
    },value);

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
        // maxDate={dayjs(new Date()).toDate()}
        maxDate={(choosing)? getMinDate([addDays(value[0],6),dayjs(new Date()).toDate()]) :dayjs(new Date()).toDate()}
        minDate={(choosing)? addDays(value[0],-6) : null}
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
        <DynamicHistogram2 datas={[{value : 1, label: "Mon"},{value : 0.5, label: "Tue"},{value : 0.2, label: "Wed"},{value : 0.6, label: "Thu"},{value : 0.5, label: "Fri"}]}/>
        {/* <DynamicHistogram datas={histogramValues}/> */}
        </div>
    );
    
}

export default WorkChart;