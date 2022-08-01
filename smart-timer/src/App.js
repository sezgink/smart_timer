import logo from './logo.svg';
import './App.css';
import StartToggle from './startToggle';
import {useState} from 'react';



function App() {
  let [isCounting,setIsCounting] = useState(false);
  function onStartToggle(){
    setIsCounting(!isCounting);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <StartToggle isCounting={isCounting} onToggle={onStartToggle}/>
        
        
      </header>
    </div>
  );
}

export default App;
