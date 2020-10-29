const flash = (state = {}, action) => {
    switch (action.type) {
      case 'SETFLASH':
        return {status: true, msg: action.flash.msg, severity: action.flash.severity}
      case 'CLEARFLASH':
        return {status: false, msg: 'none', severity: 'success'}
      default:
        return state;
    }
  };
  
  export default flash;