const auth = (state = {}, action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.user
      case 'LOGOUT':
        return { isAuthenticated: false }
      default:
        return state;
    }
  };
  
  export default auth;