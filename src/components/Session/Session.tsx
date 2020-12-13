import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSession } from '../../api/session'
import { DataGrid, ColDef } from '@material-ui/data-grid'
import { Session, Song } from '../../typings/types'
import { searchSongByName } from '../../api/song'

interface Props {}
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete'

const SessionPage = (props: Props) => {
  let { id } = useParams()

  const [session, setSession] = useState<Session>()
  const [optionSongs, setOptionSongs] = useState<Array<any>>([])
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    getSession(id).then((session) => setSession(session))
    searchSongByName(filterName).then(
      (songs) => console.log('Not implemented'),
      // setOptionSongs(Object.keys(songs).map((key) => songs[key].item[0]));
    )
  }, [])

  const columns: ColDef[] = [
    { field: 'songName', headerName: 'name', width: 90 },
    { field: 'songTime', headerName: 'time', width: 130 },
    { field: 'votes', headerName: 'votes', width: 130 },
  ]

  return (
    <Container maxWidth="md">
      <DataGrid
        rows={
          session
            ? [
                ...session.songs.map((s: Song) => {
                  return { ...s, ...{ id: s.objectId, votes: (Math.random() * 10).toFixed(0) } }
                }),
              ]
            : []
        }
        columns={columns}
        pageSize={5}
        autoHeight
      />
      <Autocomplete
        id="combo-box-demo"
        options={optionSongs}
        getOptionLabel={(option) => option?.name}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
    </Container>
  )
}

export default SessionPage
