import {
  SAVE_SESSION,
  RESET_SESSION
} from '../actions/types';

const INITIAL_STATE = {
  interval: '',
  duration: '',
  startTime: null,
  endTime: null,
  paused: false,
  active: false
}

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case SAVE_SESSION:
      console.log('reducer', action.payload, ...action.payload);
      return {
        ...state,
        ...action.payload
      };
    case RESET_SESSION:
      return INITIAL_STATE;
    default:
      return state;
  }
}