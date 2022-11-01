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
import PastIntervalsList from './pastIntervalList';

import AvailableMissionEditor from './availableMissionEditor';




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
  let [availableMissions,setAvailableMissions] = useState([]);
  let [currentMission,setCurrentMission] = useState(String);

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
    // setPastIntervals(pastIntervals=>[...pastIntervals,{interval: currentCount, date: new Date(currentCount*1000), mission: currentMission}]);
    setPastIntervals(pastIntervals=>[...pastIntervals,{interval: currentCount, date: currentCount, mission: currentMission}]);
    setCurrentCount(0);
    
  }
  
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

  function addMission(missionName) {
    if(availableMissions.includes(missionName)===false)
    setAvailableMissions(availableMissions=>[...availableMissions,missionName]);
  }
  function deleteMission(index) {
    // function addMission(missionName) {
      // if(availableMissions.includes(missionName)===false)
      let missionCopy = [...availableMissions];
      missionCopy.splice(index,1);
      setAvailableMissions(missionCopy);
  }
  function selectMission(index) {
    // function addMission(missionName) {
      // if(availableMissions.includes(missionName)===false)
      let currentMissionTemp = availableMissions[index];
      console.log("Selected Mission"+index);
      setCurrentMission(currentMissionTemp);
      closeMissionSelect();
  }  
  const [missionSelectOpen, setMissionSelectOpen] = useState(false);
  function onMissionSelectToggle(){
    setMissionSelectOpen((missionSelectOpen)=>!missionSelectOpen);
  }
  function closeMissionSelect(){
    setMissionSelectOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">

        <div>
        <TimerText isCounting={isCounting} currentCount={currentCount}/>
        <p>{currentMission}</p>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>

        <button className='straightButton' onClick={onClearClick}>Clean</button>
        <br/>
        <button className='straightButton' onClick={onMissionSelectToggle}>Select Mission</button>
        {(missionSelectOpen)&&<AvailableMissionEditor addMissionHandler={addMission} missionList={availableMissions} deleteMissionHandler={deleteMission} selectMissionHandler={selectMission}/>}

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
