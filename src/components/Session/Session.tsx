import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSession } from '../../api/session'
import { Session } from '../../typings/types'
import { searchSongByNameContains } from '../../api/song'

interface Props {}
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import Table from '../UI/SongTable'

const SessionPage = (props: Props) => {
  let { id } = useParams()

  const [session, setSession] = useState<Session>()
  const [optionSongs, setOptionSongs] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    getSession(id).then((session) => setSession(session))
    searchSongByNameContains(filterName).then(
      (songs) => console.log('Not implemented'),
      // setOptionSongs(Object.keys(songs).map((key) => songs[key].item[0]));
    )
  }, [])

  useEffect(() => {
    setSongs(session ? [...session.songs] : [])
  }, [session])

  useEffect(() => {
    console.log('songs', songs)
  }, [songs])

  return (
    <Container maxWidth="md">
      <Autocomplete
        id="combo-box-demo"
        options={optionSongs}
        getOptionLabel={(option) => option?.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Combo box"
            variant="outlined"
            onChange={(e) => setFilterName(e.target.value)}
          />
        )}
      />
      <Table songs={songs}></Table>
    </Container>
  )
}

export default SessionPage
