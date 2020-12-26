import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSession } from '../../api/session'
import { Session } from '../../typings/types'
import { searchSongByNameContains } from '../../api/song'
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'
import Table from '../UI/SongTable'

interface Props {}

const SessionPage = (props: Props) => {
  let { id } = useParams()

  const [session, setSession] = useState<Session>()
  const [optionSongs, setOptionSongs] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')
  const [songs, setSongs] = useState([])

  useEffect(() => {
    getSession(id).then((session) => setSession(session))
  }, [])

  useEffect(() => {
    filterName &&
      searchSongByNameContains(filterName).then((songs) => {
        setOptionSongs(songs.items || [])
      })
  }, [filterName])

  return (
    <Container maxWidth="md">
      <Autocomplete
        id="combo-box-demo"
        options={optionSongs}
        clearOnEscape={false}
        inputValue={filterName || 'Funer'}
        onChange={(event: any, newValue: string | null) => {
          console.log('newValue', newValue)
        }}
        onInputChange={(event, newInputValue) => setFilterName(newInputValue)}
        getOptionLabel={(option) => option?.name + ' - ' + option.artists[0].name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Combo box" variant="outlined" value={filterName} />
        )}
      />
      <Table songs={songs}></Table>
    </Container>
  )
}

export default SessionPage
