import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import { converSecondsToHourAndMinutesString, converSecondsToHourMinutesSecondsString } from './timeFunctions'
import {useRef,useEffect} from 'react';

function PastIntervalsList(props){

    const scrollRef = useRef(null);

    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behaviour: "smooth",  block: 'nearest', inline: 'start' });
      }
    }, [props.pastIntervalsInput]);

    return(<List sx={{maxHeight: 200, overflow: 'auto',width: '100%' }}>
    {props.pastIntervalsInput.map((value,index) => (
      <ListItem
        key={index}
        disableGutters
        secondaryAction={
          <IconButton aria-label="comment">
            {/* <CommentIcon /> */}
          </IconButton>
        }
      >
        {/* <ListItemText primary={`${index+1}.Session ${value.date.toISOString().substring(11,16)}`} secondary={value.mission} secondaryTypographyProps={{color: 'rgb(102, 157, 246)'}}/> */}
        <ListItemText primary={`${index+1}.Session ${converSecondsToHourMinutesSecondsString(value.date)}`} secondary={value.mission} secondaryTypographyProps={{color: 'rgb(102, 157, 246)'}}/>
      </ListItem>
    ))}
    <li ref={scrollRef} />
   </List>);
  }

  export default PastIntervalsList;