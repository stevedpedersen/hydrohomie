import {
  SAVE_SETTINGS,
  SAVE_SESSION,
  RESET_SESSION,
} from './types';

export function saveSession(session) {
  return {
    type: SAVE_SESSION,
    payload: sessions
  }
}

export function resetSession() {
  return {
    type: RESET_SESSION,
    payload: {}
  }
}

export function saveSettings(settings) {
  return {
    type: SAVE_SETTINGS,
    payload: settings
  };
}