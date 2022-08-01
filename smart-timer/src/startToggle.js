

function StartToggle(props){

    if(props.isCounting===true){
        return(<button className="positiveButton" onClick={props.onToggle}>Start</button>);
    }

    return(<button className="negativeButton" onClick={props.onToggle}>Stop</button>) ;
  }

  export default StartToggle;