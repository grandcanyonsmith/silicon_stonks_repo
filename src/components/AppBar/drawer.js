import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  link: {
      textDecoration: 'none',
      color: 'black'
  },
  title: {
    margin: '25px auto',
    textAlign: 'center'
  }
});

function TemporaryDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
    <Link className={classes.link} to='/'>
        <List>
            <ListItem button>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
            </ListItem>
        </List>
    </Link>
    <Link className={classes.link} to='/performance'>
      <List>
        <ListItem button>
        <ListItemIcon><HistoryIcon /></ListItemIcon>
        <ListItemText primary="Past Performance" />
        </ListItem>
      </List>
    </Link>
    </div>
  );

  const adminList = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
    <Divider />
    <Typography variant="h6" className={classes.title}>
      Admin
    </Typography>
    <Link className={classes.link} to='/all-stocks'>
        <List>
            <ListItem button>
            <ListItemIcon><ShowChartIcon /></ListItemIcon>
            <ListItemText primary="Stocks" />
            </ListItem>
        </List>
    </Link>
    </div>
  );

  return (
    <div>
        <React.Fragment>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
            {list('left')}
            {props.user.admin === true ? adminList('left') : null}
          </Drawer>
        </React.Fragment>
    </div>
  );
}

export default withRouter(TemporaryDrawer);