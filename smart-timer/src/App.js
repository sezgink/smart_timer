import logo from './logo.svg';
import './App.css';
import StartToggle from './startToggle';
import {useState} from 'react';



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
  let [pastIntervals,setPastIntervals] = useState([Number]);

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
    setPastIntervals(pastIntervals=>[...pastIntervals,currentCount]);
    
  }
  const pastIntervalList = pastIntervals.map((pastInterval)=>
    <div key={pastInterval}>
    <p>{pastInterval}</p>
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        {//<img src={logo} className="App-logo" alt="logo" /> 
        }
        <div>
        {pastIntervalList}
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>

        {currentCount}
        {'\n'}
        {new Date(currentCount*1000).toISOString().substring(11, 19)}

        </div>
        
      </header>
    </div>
  );
}

export default App;
