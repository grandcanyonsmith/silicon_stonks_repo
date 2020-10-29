export const setFlash = (status, msg, severity) => {
    return (dispatch) => {
        dispatch({type: 'SETFLASH', flash: {msg, severity}})
    }
  };

  export const clearFlash = () => {
    return (dispatch) => {
        dispatch({type: 'CLEARFLASH'})
    }
  };
