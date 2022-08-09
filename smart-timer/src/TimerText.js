

function TimerText(props){
    if(props.isCounting){
        return new Date(props.currentCount*1000).toISOString().substring(11, 19);
        } 
    return "Ready";
    
}

export default TimerText;