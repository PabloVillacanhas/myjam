import { Session } from '../typings/types'

const postSession = async (session: Session) => {
  return fetch(`/api/sessions/${session.code}`, {
    method: 'POST',
  })
}

const getSession = async (code: string): Promise<Session> => {
  let response = await fetch(`/api/sessions/${code}`)
  return response.json()
}

export { postSession, getSession }
