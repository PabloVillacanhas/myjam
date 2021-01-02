import { Track, Paginated, Session } from '../typings/types'

const searchTrackByNameContains = async (name: string): Promise<Paginated<Track>> => {
  const tracks = fetch(`/api/search?q=${name}&type=track`).then((res) =>
    res.json().then((r) => r.tracks),
  )
  return tracks
}

const postTrackIntoSession = async (session: Session, track: Track): Promise<Response> => {
  const tracks = await fetch(`/api/sessions/${session.id}/tracks`, {
    method: 'POST',
    headers: new Headers({ 'content-type': 'application/json' }),
    body: JSON.stringify({
      id: track.id,
      name: track.name,
    }),
  })
  return tracks
}

const voteTrack = async (session: Session, track: Track): Promise<Response> => {
  const tracks = await fetch(`/api/sessions/${session.id}/tracks/${track.id}/vote`, {
    method: 'POST',
  })
  return tracks
}

export { searchTrackByNameContains, postTrackIntoSession, voteTrack }
