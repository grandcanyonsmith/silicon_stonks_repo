import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgb(0,0,0,0.9)'
  },
  container: {
      padding: '10%'
  },
  div: {
      display: 'inline-block'
  },
  button: {
      backgroundColor: 'rgb(255,255,255,0.1)',
      color: 'white',
      marginLeft: '25px'
  }
}));

function Description(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.div}>
      <Button className={classes.button} color="primary" onClick={handleToggle}>
        Why {props.name}?
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
          <div className={classes.container}>
            {props.description}
          </div>
      </Backdrop>
    </div>
  );
}

export default Description;