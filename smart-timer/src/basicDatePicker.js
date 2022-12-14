import { DateRangePicker, DateRangePickerValue } from '@mantine/dates';
import dayjs from 'dayjs';
import { MantineProvider } from '@mantine/core';
import { useEffect, useState } from 'react';

const url2fetch = "https://smart-timer-api.onrender.com/intervals/getDailyWorkBetween?"

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  // console.log(result);
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


  // console.log(minDate);
  return minDate;
}

function BasicDatePicker(props) {
    const [value, setValue] = useState([
        dayjs(new Date()).toDate(),
        dayjs(new Date()).toDate(),
    ]);

    const [choosing,setChoosing]= useState(false);

    useEffect(()=>{
      if(!value[1]&&value[0]){
        setChoosing(true);
      } else {
        setChoosing(false);
      }
    },value);

    function getDaysInMonth(year, month) {
      return new Date(year, month+1, 0).getDate();
    }
    function GetNewIntervals(){
        //fetch with value
        // console.log(value);

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
          
          const beginDate = value[0];
          // const endDate = value[1].setHours(23,59,59);
          const endDate = dayjs(value[1]).endOf('day').toDate();
          // console.log({beginDate,endDate});
          
          fetch(url2fetch+new URLSearchParams({beginDate ,endDate}),fetchOptions).then((res)=>{
            // console.log("Response came");
            // console.log(res.json());
            res.json().then((jres)=>{
              // console.log(jres);
              
              if(res.status===400){
                console.log("Wrong email or password");
                // setErrorMessage(true);

                // alert("Wrong email or password!");
              }
              const daysInMonth = getDaysInMonth(beginDate.getFullYear(),beginDate.getMonth());
              // const firstDay = beginDate.getDate();
              const firstDay = beginDate;
              props.onIntervalsCome(jres,{firstDay,daysInMonth});
              
              
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
        // <div style={{minWidth:200, width:"25%"}}>
        <div style={{minWidth:200,maxWidth:"100%",alignItems:'center',textAlign:'center',display:'flex',justifyContent:'center'}}>
           {/* <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS> */}
           <MantineProvider theme={{ colorScheme: 'dark' }}>
            <DateRangePicker
              label="Choose Day Interval"
              placeholder="Pick dates range"
              value={value}
              onChange={setValue}
              // maxDate={dayjs(new Date()).toDate()}
              maxDate={(choosing)? getMinDate([addDays(value[0],6),dayjs(new Date()).toDate()]) :dayjs(new Date()).toDate()}
              minDate={(choosing)? addDays(value[0],-6) : null}
              maxLength={1000}
              style={{width:320}}
            />
      </MantineProvider>
      </div>
    );
  }

  export default BasicDatePicker;