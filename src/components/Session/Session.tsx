import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSession } from '../../api/session'
import { Session, Track } from '../../typings/types'
import { searchTrackByNameContains, postTrackIntoSession, voteTrack } from '../../api/track'
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import Table from '../UI/TrackTable'
import { io } from 'socket.io-client'

interface Props {}

const SessionPage = (props: Props) => {
  let { id } = useParams()

  const [session, setSession] = useState<Session>()
  const [optiontracks, setOptiontracks] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    const socket = io({ transports: ['websocket'] })
    getSession(id).then((session) => {
      setSession(session)
      socket.emit('join', session.id)
      socket.on(`votes/${session.id}`, (vote) => {
        setSession({
          ...session,
          tracks: session.tracks?.map((t) =>
            t.id === vote.track_id ? { ...t, votes: vote.votes } : t,
          ),
        })
      })
    })
  }, [])

  useEffect(() => {
    filterName &&
      searchTrackByNameContains(filterName).then((tracks) => {
        setOptiontracks(tracks?.items || [])
      })
  }, [filterName])

  const onChangeTrackVote = (track) => {
    voteTrack(session, track).then(() =>
      setSession({
        ...session,
        tracks: [
          ...session.tracks.map((t) =>
            t.id === track.id ? { ...t, votes: track.votes + 1 } : { ...t },
          ),
        ],
      }),
    )
  }

  return (
    <Container maxWidth="md">
      <Autocomplete
        id="combo-box-demo"
        options={optiontracks as Array<Track>}
        clearOnEscape={true}
        onChange={(event: any, track: Track | null) => {
          console.log('session', session)
          postTrackIntoSession(session, track).then(() => {
            track.votes = 0
            setSession({ ...session, tracks: [...session.tracks, track] })
            setFilterName('')
          })
        }}
        onInputChange={(event, newInputValue) => setFilterName(newInputValue)}
        getOptionLabel={(option) => option?.name + ' - ' + option.artists[0].name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" value={filterName} />
        )}
      />
      <Table tracks={session?.tracks || []} onChangeTrackVote={onChangeTrackVote}></Table>
    </Container>
  )
}

export default SessionPage
