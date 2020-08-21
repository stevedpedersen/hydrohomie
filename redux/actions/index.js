import {
  SAVE_SETTINGS
} from './types';

export function saveSettings(settings) {
  // console.log('in action saveSettings:', settings);
  return {
    type: SAVE_SETTINGS,
    payload: settings
  };
}