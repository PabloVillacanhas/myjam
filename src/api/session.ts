import { Session, Track } from '../typings/types'

const postSession = async (session: Session) => {
  return fetch(`/api/sessions/${session.id}`, {
    method: 'POST',
  })
}

const fetchSession = async (id: string): Promise<Session> => {
  const response = await fetch(`/api/sessions/${id}`)
  return response.json()
}

const voteTrack = async (sessionId: number, trackId: number): Promise<Response> => {
  const tracks = await fetch(`/api/sessions/${sessionId}/tracks/${trackId}/vote`, {
    method: 'POST',
  })
  return tracks
}

export default { postSession, fetchSession, voteTrack }
