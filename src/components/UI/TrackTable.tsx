import * as React from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Track } from '../../typings/types'
import { useSelector, useDispatch } from 'react-redux'
import { voteTrack } from '../../state/actions/session'

interface TrackTableProps {
  sessionId: string
}

export default function TrackTable(props: TrackTableProps) {
  const tracks: Array<Track> = useSelector((state) => state.session.tracks)
  const dispatch = useDispatch()

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
          {JSON.stringify(tracks)}
          {tracks?.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">undefined</TableCell>
              <TableCell align="right">
                <button onClick={(e) => dispatch(voteTrack(props.sessionId, row.id))}>
                  {row.votes || 0}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
