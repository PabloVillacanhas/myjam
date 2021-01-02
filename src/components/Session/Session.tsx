import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSession } from '../../api/session'
import { Session, Track } from '../../typings/types'
import { searchTrackByNameContains, postTrackIntoSession } from '../../api/track'
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import Table from '../UI/TrackTable'

interface Props {}

const SessionPage = (props: Props) => {
  let { id } = useParams()

  const [session, setSession] = useState<Session>()
  const [optiontracks, setOptiontracks] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    getSession(id).then((session) => setSession(session[0]))
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
            setTracks([...tracks, track])
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
      <Table tracks={tracks}></Table>
    </Container>
  )
}

export default SessionPage
