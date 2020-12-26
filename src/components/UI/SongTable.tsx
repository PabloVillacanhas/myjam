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

interface VoteCellProps {
  votes: number
  onChangeVote?: (number) => void
}

export const VoteCell = (props: VoteCellProps) => {
  return (
    <button
      onClick={(e) => {
        props.onChangeVote(props.votes + 1)
      }}
    >
      {props.votes}
    </button>
  )
}

export interface ITableProps {
  songs: Array<Track>
}

export default function SongTable(props: ITableProps) {
  const [songs, setSongs] = useState([])

  useEffect(() => {
    setSongs(props.songs)
  }, [props.songs])

  const onChangeVote = (songId, votes) => {
    setSongs([...songs.map((s) => (s.objectId === songId ? { ...s, votes: votes } : { ...s }))])
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Song name</TableCell>
            <TableCell align="right">Duration</TableCell>
            <TableCell align="right">Votes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((row) => (
            <TableRow key={row.objectId}>
              <TableCell component="th" scope="row">
                {row.songName}
              </TableCell>
              <TableCell align="right">{row.songTime}</TableCell>
              <TableCell align="right">
                <VoteCell
                  votes={row.votes ? row.votes : parseInt((Math.random() * 10).toFixed(0))}
                  onChangeVote={(vote) => {
                    onChangeVote(row.objectId, vote)
                  }}
                ></VoteCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
