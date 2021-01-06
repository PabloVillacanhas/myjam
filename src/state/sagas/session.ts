import { call, put, takeEvery, all } from 'redux-saga/effects'
import Api from '../../api/session'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchSession(action) {
  try {
    const session = yield call(Api.fetchSession, action.payload.sessionId)
    yield put({ type: 'SESSION_FETCH_SUCCEEDED', payload: session })
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

function* voteTrack(action) {
  try {
    const track = yield call(Api.voteTrack, action.payload.sessionId, action.payload.trackId)
  } catch (e) {
    yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export default function* rootSaga() {
  yield takeEvery('FETCH_SESSION', fetchSession)
  yield takeEvery('VOTE_TRACK', voteTrack)
}
