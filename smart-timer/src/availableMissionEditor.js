import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { color } from '@mui/system';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { ListItemButton } from '@mui/material';

import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddMissionFormDialog from './addMissionDialogueComponent';

function AvailableMissionList(props){
    return(<List sx={{maxHeight: 200, overflow:'auto'}} >
    {props.missionList.map((value,index) => (
      <ListItem
        key={index}
        disableGutters
        secondaryAction={
          <IconButton edge={false} aria-label="delete" onClick={()=>props.deleteMissionHandler(index)}>
              {/* <DeleteIcon color= 'rgb(255, 255, 255)' /> */}
              <DeleteIcon sx={{
                color: "#7d7e80",":hover":{backgroundColor:"#7396c7"}
                }} />
          </IconButton>
        }
      >
        <ListItemButton onClick={()=>props.selectMissionHandler(index)}>
        <ListItemText primary={`${value}`} 
        />
        </ListItemButton>
      </ListItem>
    ))}
   </List>);

  }

  function AvailableMissionEditor(props){
    return(
      <div style={{width:'100%'}}>
        <br/>
        <AvailableMissionList missionList={props.missionList} deleteMissionHandler={props.deleteMissionHandler} selectMissionHandler={props.selectMissionHandler}></AvailableMissionList>
        {/* <Button variant='contained' onClick={props.addMissionHandler}>Add Mission</Button> */}
        <AddMissionFormDialog addMissionHandler={props.addMissionHandler}/>
        <Stack spacing={2} direction="row">
        </Stack>
      </div>
    );
  }

  export default AvailableMissionEditor;