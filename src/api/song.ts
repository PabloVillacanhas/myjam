import { Session, Song } from '../typings/types'
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'
Parse.initialize(
  'nHcnN2cYNyMeGyOi7Sja1TkRZrK9HcNebJG5niOx',
  'yJoXLWYHsxIntFMOnhX7Dh31U7JFZ49GiUg4pIGd',
  'g3PWDjwXB6hnZYcHdTkEKyjhJvVpXMpTXxWfsQD0',
)

const postSong = (song: Song, session: Session) => {
  console.error('Not implemented')
  return undefined
}

const searchSongByName = async (name: string): Promise<Array<Song>> => {
  console.error('Not implemented')
  return undefined
}

const searchSongByArtist = async (name: string): Promise<Array<Song>> => {
  console.error('Not implemented')
  return undefined
}

export { postSong, searchSongByName, searchSongByArtist }
