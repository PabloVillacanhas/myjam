import { Session } from '../typings/types'

const postSession = async (session: Session) => {
  return fetch(`/api/sessions/${session.id}`, {
    method: 'POST',
  })
}

const getSession = async (id: string): Promise<Session> => {
  const response = await fetch(`/api/sessions/${id}`)
  return response.json()
}

export { postSession, getSession }
