import { AnyAction } from 'redux'

export const addTrack = (track): AnyAction => {
  return {
    type: 'ADD_TRACK',
    payload: track,
  }
}

export const voteTrack = (sessionId: string, trackId: string): AnyAction => {
  return {
    type: 'VOTE_TRACK',
    payload: {
      sessionId: sessionId,
      trackId: trackId,
    },
  }
}
