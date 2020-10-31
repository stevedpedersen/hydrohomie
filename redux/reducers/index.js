import { combineReducers } from 'redux';
import settingsReducer from './settings';
import sessionReducer from './session';

export default combineReducers({
  settings: settingsReducer,
  session: sessionReducer
});