import { Track, Paginated } from '../typings/types'
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'
Parse.initialize(
  'nHcnN2cYNyMeGyOi7Sja1TkRZrK9HcNebJG5niOx',
  'yJoXLWYHsxIntFMOnhX7Dh31U7JFZ49GiUg4pIGd',
  'g3PWDjwXB6hnZYcHdTkEKyjhJvVpXMpTXxWfsQD0',
)

const searchTrackByNameContains = async (name: string): Promise<Paginated<Track>> => {
  const tracks = fetch(`http://localhost:3000/api/search?q=${name}&type=track`).then((res) =>
    res.json().then((r) => r.tracks),
  )
  return tracks
}

export { searchTrackByNameContains }
