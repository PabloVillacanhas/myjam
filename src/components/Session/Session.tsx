import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Session, Track } from '../../typings/types'
import { searchTrackByNameContains, postTrackIntoSession, voteTrack } from '../../api/track'
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import Table from '../UI/TrackTable'
import { io } from 'socket.io-client'

interface Props {}

const SessionPage = (props: Props) => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [session, setSession] = useState<Session>()
  const [optiontracks, setOptiontracks] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    dispatch({ type: 'FETCH_SESSION', payload: { sessionId: id } })
    dispatch({ type: 'WS_JOIN_SESSION', payload: { sessionId: id } })
    //   socket.on(`tracks/${session.id}`, (track) => {
    //     setSession({
    //       ...session,
    //       tracks: [...session.tracks, track],
    //     })
    //   })
    // })
  }, [])

  useEffect(() => {
    filterName &&
      searchTrackByNameContains(filterName).then((tracks) => {
        setOptiontracks(tracks?.items || [])
      })
  }, [filterName])

  return (
    <Container maxWidth="md">
      <Autocomplete
        id="combo-box-demo"
        options={optiontracks as Array<Track>}
        clearOnEscape={true}
        onChange={(event: any, track: Track | null) => {
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
      <Table sessionId={id}></Table>
    </Container>
  )
}

export default SessionPage
