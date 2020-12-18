import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './components.css';
import moment from 'moment';

export default function AddTraining(props) {
    const [open, setOpen] = React.useState(false);
    const m = moment().toISOString();
    const [training, setTraining] = React.useState({
    date: '', duration: '', activity: '',customer: ''
    })
    const handleClickOpen = () => {
        setTraining({customer: props.customerid})
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      
      const handleInputChange = (event) => {
          setTraining({...training, [event.target.name]: event.target.value })
      }
      const addTraining = () => {
          props.saveTraining(training);
          handleClose();
}
return(
    <div>
        <div className="addBtn">
        <Button style={{margin:10}} color="primary" onClick={handleClickOpen}>Add training</Button>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="date"
                value={training.date}
                //defaultValue={m}
                onChange={event => handleInputChange(event)}
                label="Date"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="duration"
                value={training.duration}
                onChange={event => handleInputChange(event)}
                label="Duration"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="activity"
                value={training.activity}
                onChange={event => handleInputChange(event)}
                label="Activity"
                fullWidth
                 />
                
                
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                 Cancel
                </Button>
                <Button onClick={addTraining} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}