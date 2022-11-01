import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'

function PastIntervalsList(props){

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
        <ListItemText primary={`${index+1}.Session ${value.date.toISOString().substring(11,19)}`} secondary={value.mission} secondaryTypographyProps={{color: 'rgb(102, 157, 246)'}}/>
      </ListItem>
    ))}
   </List>);
  }

  export default PastIntervalsList;