import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomerTable from './CustomerTable';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import TrainingTable from './TrainingTable';

function AppBarComp() {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Router>
    <div className="App">
 
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleClick} edge="start" color="inherit" aria-label="menu">
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}> <a href="/">Home</a></MenuItem>
              <MenuItem onClick={handleClose}><a href="/customers">Customers</a></MenuItem>
              <MenuItem onClick={handleClose}><a href="/trainings">Trainings</a></MenuItem>
              <MenuItem onClick={handleClose}>Calender</MenuItem>
            </Menu>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            PersonalTrainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/customers" component={CustomerTable} />
            <Route path="/trainings" component={TrainingTable} />
            </Switch>
    </div>
    </Router>
  );
}

export default AppBarComp;
