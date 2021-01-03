import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Track } from '../../typings/types'
import { useEffect, useState } from 'react'

export interface ITableProps {
  tracks: Array<Track>
  onChangeTrackVote: (track) => void
}

export default function TrackTable(props: ITableProps) {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    console.log('props.tracks', props.tracks)
    setTracks(props.tracks)
  }, [props.tracks])

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Track name</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.TrackTime}</TableCell>
              <TableCell align="right">
                <button onClick={(e) => props.onChangeTrackVote(row)}>{row.votes}</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
