import './App.css';
import StartToggle from './startToggle';
import {useState} from 'react';
import TimerText from './TimerText';


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
          
        {pastIntervalList}
        {(pastIntervals.length>0) &&<h2>{"Total Interval:"}{getTotalInterval}</h2>}

        
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>

        {/*currentCount*/}
        {'\n'}
        <TimerText isCounting={isCounting} currentCount={currentCount}/>

        </div>
        
      </header>
    </div>
  );
}

export default App;
