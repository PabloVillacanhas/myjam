import { AnyAction } from 'redux'

const INITIAL_STATE = {
  tracks: [],
}

function tracks(state = INITIAL_STATE.tracks, action: AnyAction): Array<unknown> {
  switch (action.type) {
    case 'ADD_TRACK':
      return [state, action.payload]
    default:
      return state
  }
}

export default tracks
