import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './components.css';

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '',
        email: '', phone: ''
    })
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      
      const handleInputChange = (event) => {
          setCustomer({...customer, [event.target.name]: event.target.value })
      }
      const addCustomer = () => {
          props.saveCustomer(customer);
          handleClose();
}
return(
    <div>
        <div className="addCustomerBtn">
        <Button style={{margin:10}} variant="outlined" color="primary" onClick={handleClickOpen}>Add Customer</Button>
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New customer</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                name="firstname"
                value={customer.firstname}
                onChange={event => handleInputChange(event)}
                label="Firstname"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="lastname"
                value={customer.lastname}
                onChange={event => handleInputChange(event)}
                label="Lastname"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="streetaddress"
                value={customer.streetaddress}
                onChange={event => handleInputChange(event)}
                label="Streetaddress"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="postcode"
                value={customer.postcode}
                onChange={event => handleInputChange(event)}
                label="Postcode"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="city"
                value={customer.city}
                onChange={event => handleInputChange(event)}
                label="City"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="email"
                value={customer.email}
                onChange={event => handleInputChange(event)}
                label="Email"
                fullWidth
                 />
                <TextField
                margin="dense"
                name="phone"
                value={customer.phone}
                onChange={event => handleInputChange(event)}
                label="Phone"
                fullWidth
                 />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                 Cancel
                </Button>
                <Button onClick={addCustomer} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}