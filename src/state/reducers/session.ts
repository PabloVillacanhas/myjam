import { AnyAction } from 'redux'
import { Session, Track } from '../../typings/types'

const INITIAL_STATE: Session = {
  id: undefined,
  tracks: [],
  createdAt: undefined,
  updatedAt: undefined,
}

function tracks(state = INITIAL_STATE, action: AnyAction): Session {
  switch (action.type) {
    case 'SESSION_FETCH_SUCCEEDED':
      return action.payload
    // case 'WS_ADD_TRACK':
    //   return {...state, action.payload}
    case 'WS_UPDATE_TRACK':
      return {
        ...state,
        tracks: state.tracks?.map((t) =>
          t.id === action.payload.track_id ? { ...t, ...action.payload } : { ...t },
        ),
      }
    default:
      return state
  }
}

export default tracks
