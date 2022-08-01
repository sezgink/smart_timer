

function StartToggle(props){

    if(props.isCounting===true){
        return(<button className="negativeButton" onClick={props.onToggle}>Stop</button>) ;
        
    }
    return(<button className="positiveButton" onClick={props.onToggle}>Start</button>);
    
  }

  export default StartToggle;