import {
  SAVE_SETTINGS
} from '../actions/types';

const INITIAL_STATE = {
  interval: '60',
  length: '360'
}

export default function(state = INITIAL_STATE, action) {
  console.log('in settings reducer');
  switch (action.type) {
    case SAVE_SETTINGS:
      console.log('in settings reducer, case SAVE_SETTINGS', action.payload);
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}