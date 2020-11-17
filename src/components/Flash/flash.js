import React from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {clearFlash} from '../../actions/flash';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function Flash(props) { 
    const classes = useStyles();
    const {flash} = props;
  
    const handleClose = () => {
        const {dispatch} = props;
        dispatch(clearFlash())
      
    };
  
    if(flash.length === 0) {
      return null
    } else {
      return (
        <div className={classes.root}>
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={flash.status} autoHideDuration={8000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={`${flash.severity}`}>
              {flash.msg}
            </Alert>
          </Snackbar>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {flash: state.flash}
}

export default connect(mapStateToProps)(Flash);
