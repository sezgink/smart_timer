import { Button } from "@mui/material";


function StartToggle(props){

    // if(props.isCounting===true){
    //     // return(<button className="negativeButton" onClick={props.onToggle}>Stop</button>) ;
    //     return(<Button  size="large" variant="contained" className="negativeButton" onClick={props.onToggle}>Stop</Button>) ;
        
    // }
    // return(<Button color="" size="large" variant="contained" className="positiveButton" onClick={props.onToggle}>Start</Button>);
    return(<Button color={(props.isCounting===true)?"error":"success"} size="large" variant="contained"  onClick={props.onToggle}>{(props.isCounting===true)?"Stop":"Start"}</Button>);
    
  }

  export default StartToggle;