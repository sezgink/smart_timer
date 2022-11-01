import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddMissionFormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [missionName, setMissionName] = React.useState(String);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddThenClose = () => {
    if(missionName==='')
        return;
    props.addMissionHandler(missionName);
    setOpen(false);
  };
  const handleMissionNameChange = (e) =>{
    setMissionName(e.target.value);
  }

  return (
    <div>
      <Button variant='contained' onClick={handleClickOpen}>Add Mission</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Mission</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new mission, enter its name.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="missionName"
            label="Mission Name"
            fullWidth
            variant="standard"
            value={missionName}
            onChange={handleMissionNameChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddThenClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
