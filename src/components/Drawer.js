import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Route, Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createBrowserHistory } from "history";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ContactsIcon from '@material-ui/icons/Contacts';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import BarChartIcon from '@material-ui/icons/BarChart';
import TrainingTable from './TrainingTable';
import CustomerTable from './CustomerTable';
import Schedule from './Schedule';
import Statistics from './Chart';

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  }
});

const MyToolbar = withStyles(styles)(({ classes, title, onMenuClick }) => (
  <Fragment>
    <AppBar className={classes.aboveDrawer}>
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
    <div className={classes.toolbarMargin} />
  </Fragment>
));

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent"
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/Customers"
            onClick={onItemClick("Customers")}
          >
            <ListItemIcon> <ContactsIcon /> </ListItemIcon>
            <ListItemText>Customers</ListItemText>
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/trainings"
            onClick={onItemClick("Trainings")}>
            <ListItemIcon> <DirectionsRunIcon /> </ListItemIcon>
            <ListItemText>Trainings</ListItemText>
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/calendar"
            onClick={onItemClick("Calendar")}>
            <ListItemIcon> <CalendarTodayIcon /> </ListItemIcon>
            <ListItemText>Calendar</ListItemText>
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/statistics"
            onClick={onItemClick("Statistics")}>
            <ListItemIcon> <BarChartIcon /> </ListItemIcon>
            <ListItemText>Statistics</ListItemText>

          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route path="/customers" component={CustomerTable} />
        <Route path="/trainings" component={TrainingTable} />
        <Route path="/calendar" component={Schedule} />
        <Route path="/statistics" component={Statistics} />
      </main>
    </Router>
  )
);

function CustomAppBar({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Home");

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(CustomAppBar);
