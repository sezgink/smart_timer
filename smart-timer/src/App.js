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
    
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>
        {currentCount}
        </div>
        
      </header>
    </div>
  );
}

export default App;
