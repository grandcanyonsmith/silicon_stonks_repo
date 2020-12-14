import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Divider from '@material-ui/core/Divider';
import ShowChartIcon from '@material-ui/icons/ShowChart';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '65vw',
    backgroundColor: 'grey',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    display: 'inline-block'
  },
  button: {
    textDecoration: 'none',
    backgroundColor: 'white',
    padding: '8px',
    borderRadius: '25px',
    color: 'black',
    fontSize: '12px'
  },
  divider: {
    margin: '50px 0px 50px 0px'
  },
  title: {
    textAlign: 'center'
  },
  buttonContainer: {
    textAlign: 'center'
  }
}));

function Description(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 className={classes.title} id="simple-modal-title">Why {props.name}?</h2>
      <Divider className={classes.divider}/>
      <p id="simple-modal-description">
        {props.description}
      </p>
      <Divider className={classes.divider} />
      <div className={classes.buttonContainer}>
        <a className={classes.button} href={props.url} target='_blank' rel="noopener noreferrer">See Charts</a>
      </div>
    </div>
  );

  return (
    <div className={classes.container}>
      <a onClick={handleOpen} className={classes.link}><li>{props.name}</li></a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default Description;