import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';

export default function EditCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = React.useState({
        firstname: '', lastname: '', streetaddress: '', postcode: '', city: '',
        email: '', phone: ''
    })
    const handleClickOpen = () => {
        setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, 
        streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
      
      const handleInputChange = (event) => {
          setCustomer({...customer, [event.target.name]: event.target.value })
      }
      const updateCustomer = () => {
          props.updateCustomer(customer, props.customer.links[1].href);
          handleClose();
}
return(
    <div>
        <Button color="primary" onClick={handleClickOpen}><EditIcon /></Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
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
                <Button onClick={updateCustomer} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    </div>
);
}