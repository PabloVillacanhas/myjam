import { AnyAction } from 'redux'

export const addTrack = (track): AnyAction => {
  return {
    type: 'ADD_TRACK',
    payload: track,
  }
}
