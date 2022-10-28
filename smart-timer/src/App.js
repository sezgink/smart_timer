import './App.css';
import StartToggle from './startToggle';
import {useState} from 'react';
import TimerText from './TimerText';

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { color } from '@mui/system';




function App() {
  let [isCounting,setIsCounting] = useState(false);
  // let intervalID;
  function onStartToggle(){
    if(isCounting)
    {
      stopCounting();
      
    } else {
      startCounting();
    }
    setIsCounting(!isCounting);
  }
  function onClearClick(){
    setPastIntervals([]);
  }
  let [currentCount,setCurrentCount] = useState(0);
  let [intervalID,setIntervalID] = useState(0);
  // let [pastIntervals,setPastIntervals] = useState([Number]);
  let [pastIntervals,setPastIntervals] = useState([]);

  function tickTime(){
    // let newCount = currentCount+1;
     setCurrentCount(currentCount=>currentCount+1);
     
  }
  function startCounting() {
    let newIntervalID = setInterval(tickTime, 1000);
    setIntervalID(newIntervalID);
  }
  function stopCounting(){
    clearInterval(intervalID);
    // setPastIntervals(pastIntervals=>[...pastIntervals,currentCount]);
    setPastIntervals(pastIntervals=>[...pastIntervals,{interval: currentCount, date: new Date(currentCount*1000)}]);
    setCurrentCount(0);
    
  }
  const pastIntervalList = pastIntervals.map((pastInterval,index)=>
    <div key={index}>
    {/*pastInterval*/}{index+1}th Session {pastInterval.date.toISOString().substring(11,19)}
    </div>
  );

  const getTotalInterval = pastIntervals.reduce((accumulator,value)=>{
    return accumulator + value.interval;
  },0);
  
  // function TotalIntervalText(props){
  //   const getTotalInterval=()=>{
  //     let total = 0;
  //     props.pastIntervals.forEach(element => {
  //       total += element.interval;
  //     });
  //   }
  //   return {getTotalInterval};
  // }


  return (
    <div className="App">
      <header className="App-header">

        <div>
        <TimerText isCounting={isCounting} currentCount={currentCount}/>
        <br/>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>

        <button className='straightButton' onClick={onClearClick}>Clean</button>
        {/*currentCount*/}
        {'\n'}
        {(pastIntervals.length>0) &&<h3>{"Total Interval:"}{getTotalInterval}</h3>}
        {/* {pastIntervalList} */}
        <List sx={{maxHeight: 200, overflow: 'auto'}}>
         {pastIntervals.map((value,index) => (
           <ListItem
             key={index}
             disableGutters
             secondaryAction={
               <IconButton aria-label="comment">
                 {/* <CommentIcon /> */}
               </IconButton>
             }
           >
             <ListItemText primary={`${index+1}.Session ${value.date.toISOString().substring(11,19)}`} secondary={`Job Name`} secondaryTypographyProps={{color: 'rgb(102, 157, 246)'}}/>
           </ListItem>
         ))}
        </List>
        

        </div>
        
      </header>
    </div>
  );
}

export default App;
