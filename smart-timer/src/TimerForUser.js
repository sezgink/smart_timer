import './Timer.css';
import StartToggle from './startToggle';
import {useState,useEffect} from 'react';
import TimerText from './TimerText';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import PastIntervalsList from './pastIntervalList';

import AvailableMissionEditor from './availableMissionEditor';

import dayjs from 'dayjs';

const tasksEndPoint = "http://localhost:9443/tasks/";
const intervalsEndPoint = "http://localhost:9443/intervals/";



function TimerForUser(props) {
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

  const MissionsToNameArray = (missions)=>{
    return Array.from(missions, x=>x.name);
  }

  const fetchMissions = ()=>{
    const fetchOptions = {
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') 
        },
        method: "GET",
      }
    fetch(tasksEndPoint,fetchOptions).then((fetchedTasks)=>{
        
        fetchedTasks.json().then((tasksJSON)=>{
            setAvailableMissions(tasksJSON);  
            console.log(tasksJSON);
        });
        
      
    }).catch((e)=>{
        console.log("err"+e);
    });
  }
  const fetchPastIntervals = async ()=>{
    try{
        const fetchOptions = {
            headers: {
              // 'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token') 
            },
            method: "GET",
        }
        const now = dayjs();
        const todayLimit = now.subtract(12,'hour');
        const nextLimit = now.add(54,'hour');
        const fetchResult = await fetch(intervalsEndPoint+"getBetween?"+new URLSearchParams({beginDate: todayLimit ,endDate: nextLimit}),fetchOptions);
        const intervalsJSON = await fetchResult.json();
        console.log(intervalsJSON);
        setPastIntervals(intervalsJSON.intervalsBetween);  
    } catch(e){
        console.log(e);
    }
    
  }
  //On component mount
  useEffect(()=>{
    fetchMissions();
    fetchPastIntervals();
    console.log("On Mount");
  },[]);

  function tickTime(){
    // let newCount = currentCount+1;
     setCurrentCount(currentCount=>currentCount+1);
     
  }
  function startCounting() {
    let newIntervalID = setInterval(tickTime, 1000);
    setIntervalID(newIntervalID);
  }
  async function stopCounting(){
    clearInterval(intervalID);    
    try {
        const fetchOptions = {
            headers: {
              // 'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token') 
            },
            method: "POST",
            body: JSON.stringify({intervalLength:currentCount, task:currentMission,}, null, 2)
          }

          const postResult = await fetch(intervalsEndPoint+"add",fetchOptions);

          if(postResult.status!==201){
            throw new Error("Couldn't add interval");
          }

          const createdInterval = await postResult.json();
          console.log(createdInterval);
          setPastIntervals(pastIntervals=>[...pastIntervals,{intervalLength: currentCount, task: currentMission}]);

    } catch(e){
        console.log("Interval Adding error"+e);
    }
    setCurrentCount(0);
  }
  
  const getTotalInterval = pastIntervals.reduce((accumulator,value)=>{
    return accumulator + value.intervalLength;
  },0);

  async function addMission(missionName) {
    if(MissionsToNameArray(availableMissions).includes(missionName)===false){
        try {
            const fetchOptions = {
                headers: {
                  // 'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': localStorage.getItem('token') 
                },
                method: "POST",
                body: JSON.stringify({name:missionName}, null, 2)
              }

              const postResult = await fetch(tasksEndPoint,fetchOptions);

              if(postResult.status!==201){
                throw new Error("Couldn't add");
              }

              const createdMission = await postResult.json();
              console.log(createdMission);
              setAvailableMissions(availableMissions=>[...availableMissions,createdMission]);

        } catch(e){
            console.log("Adding error"+e);
        }
    }
        
  }
  async function deleteMission(index) {
    try{
        const missionToDelete = availableMissions[index];

        const fetchOptions = {
            headers: {
              // 'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('token') 
            },
            method: "DELETE",
          }
        let result = await fetch(tasksEndPoint+missionToDelete._id,fetchOptions);
        if(result.status!==200){
            throw new Error("Couldn't delete");
        }
        let missionCopy = [...availableMissions];
        missionCopy.splice(index,1);
        setAvailableMissions(missionCopy);

        if(currentMission===missionToDelete.name){
          setCurrentMission("");
        }

    } catch (e){
        console.log(e);
    }
    
  }
  function selectMission(index) {
      let currentMissionTemp = availableMissions[index];
      setCurrentMission(currentMissionTemp.name);
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
        {(missionSelectOpen)&&<AvailableMissionEditor addMissionHandler={addMission} missionList={MissionsToNameArray(availableMissions)} deleteMissionHandler={deleteMission} selectMissionHandler={selectMission}/>}

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

export default TimerForUser;
