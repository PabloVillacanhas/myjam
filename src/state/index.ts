import { AnyAction, createStore } from 'redux'

const INITIAL_STATE = {
  session: {
    tracks: [],
  },
}

function tracks(state = INITIAL_STATE.session.tracks, action: AnyAction): Array<unknown> {
  switch (action.type) {
    case 'ADD_TRACK':
      return [state, action.payload]
    default:
      return state
  }
}

// Creamos un store de Redux almacenando el estado de la aplicación.
// Su API es { subscribe, dispatch, getState }.
const store = createStore(tracks)

export default tracks
