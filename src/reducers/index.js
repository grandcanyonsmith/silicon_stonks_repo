import { combineReducers } from 'redux';
import auth from './auth';
import flash from './flash';

const rootReducer = combineReducers({
  auth,
  flash
});

export default rootReducer;