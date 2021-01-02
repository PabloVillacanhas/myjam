import { Track, Paginated } from '../typings/types'

const searchTrackByNameContains = async (name: string): Promise<Paginated<Track>> => {
  const tracks = fetch(`http://localhost:3000/api/search?q=${name}&type=track`).then((res) =>
    res.json().then((r) => r.tracks),
  )
  return tracks
}

export { searchTrackByNameContains }
