import { Session } from '../typings/types'
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'
Parse.initialize(
  'nHcnN2cYNyMeGyOi7Sja1TkRZrK9HcNebJG5niOx',
  'yJoXLWYHsxIntFMOnhX7Dh31U7JFZ49GiUg4pIGd',
  'g3PWDjwXB6hnZYcHdTkEKyjhJvVpXMpTXxWfsQD0',
)

const postSession = (session: Session) => {
  const Session = Parse.Object.extend('Session')
  const myNewObject = new Session()

  myNewObject.set('code', session.code)

  myNewObject.save().then(
    (result) => {
      console.log('Session created', result)
    },
    (error) => {
      console.error('Error while creating Session: ', error)
    },
  )
}

const getSession = async (code: string): Promise<Session> => {
  const Session = Parse.Object.extend('Session') // Declare the type.
  const query = new Parse.Query(Session).include('songs') // Create the instance
  query.equalTo('code', code)
  const sessionP = await query.find()
  const songsP = await sessionP[0].relation('songs').query().findAll()

  let session = sessionP[0].toJSON() as any
  session.songs = songsP.map((s) => s.toJSON())

  return session
}

export { postSession, getSession }
