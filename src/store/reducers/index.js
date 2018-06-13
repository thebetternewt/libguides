import { combineReducers } from 'redux';
import authReducer from './authReducer';
import accountReducer from './accountReducer';
import statsReducer from './statsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  account: accountReducer,
  stats: statsReducer,
  errors: errorReducer
});
