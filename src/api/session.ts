import { Session } from '../typings/types'

const postSession = (session: Session) => {
  fetch(`/api/sessions/${session.code}`, {
    method: 'POST',
  })
}

const getSession = async (code: string): Promise<Session> => {
  let session = await fetch(`/api/sessions/${code}`).then((r) => {
    console.log(r.text().then((r) => console.log(r)))
    return []
  })
  return session as any
}

export { postSession, getSession }
