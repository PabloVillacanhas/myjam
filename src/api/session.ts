import { Session } from '../typings/types'

const postSession = (session: Session) => {
  fetch(`/api/session/${session.code}`, { method: 'POST' })
}

const getSession = async (code: string): Promise<Session> => {
  let session = await fetch(`/api/session/${code}`, { method: 'GET' }).then((r) => r.json())
  return session
}

export { postSession, getSession }
