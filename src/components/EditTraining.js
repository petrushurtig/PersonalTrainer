import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

export default function EditTraining(props) {
    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState({
       customer:'', date: '', duration: '', activity: ''
    })
    const handleClickOpen = () => {
        setTraining({customer: props.training.customer, date: props.training.date, duration: props.training.duration, 
        activity: props.training.activity})
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      
      const handleInputChange = (event) => {
          setTraining({...training, [event.target.name]: event.target.value })
      }
      const updateTraining = () => {
          props.updateTraining(training, props.training.links[1].href);
          handleClose();
}
return(
    <div>
        <Button color="primary" onClick={handleClickOpen}><EditIcon /></Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                name="customer"
                value={training.customer}
                onChange={event => handleInputChange(event)}
                label="Customer"
                fullWidth
                 />
                <TextField
                autoFocus
                margin="dense"
                name="date"
                value={training.date}
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
                <Button onClick={updateTraining} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}