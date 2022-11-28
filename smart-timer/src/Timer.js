import './Timer.css';
import StartToggle from './startToggle';
import {useState} from 'react';
import TimerText from './TimerText';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import PastIntervalsList from './pastIntervalList';

import AvailableMissionEditor from './availableMissionEditor';

function Timer(props) {
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
    <div className="Timer">
      <header className="Timer-header">

        <div style={{}} >
        <TimerText isCounting={isCounting} currentCount={currentCount}/>
        <p>{"Current Mission: "}{currentMission?currentMission:"None"}</p>

        <Stack direction="row" spacing={2} style={{justifyContent:'center', display:'flex'}}>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>
        <Button size="large" variant="contained" onClick={onClearClick}>Clean</Button>
        {/* <button className='straightButton' onClick={onClearClick}>Clean</button> */}
        </Stack>
        
        <br/>
        {/* <button className='straightButton' onClick={onMissionSelectToggle}>Select Mission</button> */}
        <Button size="large" variant="contained" onClick={onMissionSelectToggle}>Select Mission</Button>
        {(missionSelectOpen)&&<AvailableMissionEditor addMissionHandler={addMission} missionList={availableMissions} deleteMissionHandler={deleteMission} selectMissionHandler={selectMission}/>}

        {/*currentCount*/}
        {'\n'}
        {(pastIntervals.length>0) &&<h4>{"Total Interval:"}{(getTotalInterval/60).toFixed()}{" Minutes"}</h4>}
        {/* {pastIntervalList} */}
        
        <PastIntervalsList pastIntervalsInput={pastIntervals}/>

        </div>
        
      </header>
    </div>
  );
}

export default Timer;
