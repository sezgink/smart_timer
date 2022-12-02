import { height } from '@mui/system';
import {useState } from 'react';

import * as React from 'react';



import {DynamicHistogram, DynamicHistogram2} from './dynamicHistogram';


import WorkDataTable from './workDataTable';
import BasicDatePicker  from './basicDatePicker';

  

const WorkChart = (props)=>{
  // let [histogramValues,setHistogramValues] = useState([0]);
  let [histogramValues,setHistogramValues] = useState([]);
  let [intervalsData,setIntervalsData] = useState([]);
  let [labelData,setLabelData] = useState({});
    function onIntervalsCome(data,beginInfo){
      // console.log("data"+ data.toString());
      const intervalsBetween = data.intervalsBetween;
      const timesPerDay = intervalsBetween.map((dailyData)=>{
        const dailySum = Object.values(dailyData).reduce((rv,x)=>{
          return rv + x/3600; //Convert to hours when summing
        },0)
        return dailySum;
      });
      // console.log(timesPerDay);
      setLabelData({firstDay :beginInfo.firstDay, daysInMonth:beginInfo.daysInMonth});
      setHistogramValues(timesPerDay);
      setIntervalsData(intervalsBetween);
      
    }

    const valuesToValueAndLabels = (valuesArray)=>valuesArray.map((value,index)=>{
      // return {value, label:index}
      
      // console.log(labelData.firstDay);
      let month = 0;
      let rawDay = 0;

      if(labelData.firstDay){
        rawDay = labelData.firstDay.getDate()+index;
        month = labelData.firstDay.getMonth();
        // console.log(month);
        if(rawDay>labelData.daysInMonth){
          rawDay = rawDay%labelData.daysInMonth;
          month+=1;
        }
      }
      
      return {value, label: (labelData.firstDay)?(month+"."+rawDay):null};
    });

    const checkForShow = ()=>{
      // const checkValues = histogramValues.reduce((rv,x)=>{
      //   return (x != 0)||rv;
      // });
      return (histogramValues.length>1)||histogramValues[0]>0;
    }

    return (<div className='Timer' style={{display:'flex',flexDirection:'column'}}>
      <div style={{alignItems:'center',width:"100%",justifyContent:"center",marginBottom:20,marginTop:50,height:"50px"}}>
        <BasicDatePicker onIntervalsCome={onIntervalsCome}/>
      </div>
        
        {/* <DynamicHistogram2 datas={[{value : 1, label: "Mon"},{value : 0.5, label: "Tue"},{value : 0.2, label: "Wed"},{value : 0.6, label: "Thu"},{value : 0.5, label: "Fri"}]}/> */}
        {/* <DynamicHistogram datas={histogramValues}/> */}
        {(checkForShow())?(<div>
            <DynamicHistogram2 datas={valuesToValueAndLabels(histogramValues)}/>
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',flexDirection:"column"}}>
            <WorkDataTable datas={intervalsData}/>
            </div>
            </div>):null
        }
        
        </div>
    );
    
}

export default WorkChart;