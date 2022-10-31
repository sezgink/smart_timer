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

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';




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
  function onMissionSelectClick(){
    
  }
  let [currentCount,setCurrentCount] = useState(0);
  let [intervalID,setIntervalID] = useState(0);
  // let [pastIntervals,setPastIntervals] = useState([Number]);
  let [pastIntervals,setPastIntervals] = useState([]);
  let [availableMissions,setAvailableMissions] = useState([]);

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

  function PastIntervalsList(props){

    return(<List sx={{maxHeight: 200, overflow: 'auto',width: '100%' }}>
    {props.pastIntervalsInput.map((value,index) => (
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
   </List>);
  }

  function addMission() {
  // function addMission(missionName) {
    // if(availableMissions.includes(missionName)===false)
    setAvailableMissions(availableMissions=>[...availableMissions,"Nice Mission"+availableMissions.length]);
  }
  function deleteMission(index) {
    // function addMission(missionName) {
      // if(availableMissions.includes(missionName)===false)
      let missionCopy = [...availableMissions];
      missionCopy.splice(index,1);
      setAvailableMissions(missionCopy);
    }

  function AvailableMissionList(props){
    return(<List sx={{maxHeight: 200, overflow:'auto'}} >
    {props.missionList.map((value,index) => (
      <ListItem
        key={index}
        disableGutters
        secondaryAction={
          <IconButton edge="false" aria-label="delete" onClick={()=>deleteMission(index)}>
              {/* <DeleteIcon color= 'rgb(255, 255, 255)' /> */}
              <DeleteIcon color= "#1976d2"/>
          </IconButton>
        }
      >
        <ListItemButton>
        <ListItemText primary={`${value}`} 
        />
        </ListItemButton>
      </ListItem>
    ))}
   </List>);

  }

  function AvailableMissionEditor(props){
    return(
      <div style={{width:'100%'}}>
        <br/>
        <AvailableMissionList missionList={availableMissions}></AvailableMissionList>
        <br/>
        <Stack spacing={2} direction="row">
          <Button variant='contained' onClick={props.addMissionHandler}>Add</Button>
          <Button variant='contained'>Remove</Button>
        </Stack>
      </div>

    );
  }


  return (
    <div className="App">
      <header className="App-header">

        <div>
        <TimerText isCounting={isCounting} currentCount={currentCount}/>
        <br/>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>

        <button className='straightButton' onClick={onClearClick}>Clean</button>
        <br/>
        <button className='straightButton' onClick={onMissionSelectClick}>Select Mission</button>
        <br/>
        <AvailableMissionEditor addMissionHandler={addMission}/>

        {/*currentCount*/}
        {'\n'}
        {(pastIntervals.length>0) &&<h3>{"Total Interval:"}{getTotalInterval}</h3>}
        {/* {pastIntervalList} */}
        
        <PastIntervalsList pastIntervalsInput={pastIntervals}/>

        </div>
        
      </header>
    </div>
  );
}

export default App;
