import React, { useEffect, useState } from 'react'
import {useParams
} from "react-router-dom";
import { getSession } from '../../api/session';
import { DataGrid, ColDef, ValueGetterParams } from '@material-ui/data-grid';
import {Session, Song} from '../../typings/types'

interface Props {
}
import {Session as S } from '../../typings/types'
import { Container } from '@material-ui/core';

const SessionPage = ({}: Props) => {

	let { id } = useParams();
	
	const [session, setSession] = useState<Session>(undefined)

	useEffect(() => {
		getSession(id).then((session) =>
			setSession(session)
		)
	}, [])

	const columns: ColDef[] = [   
		{ field: 'songName', headerName: 'name', width: 90 },
		{ field: 'songTime', headerName: 'time', width: 130 },
		{ field: 'votes', headerName: 'votes', width: 130 },
	];
	
	const rows = [
		{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
		{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
		{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
		{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
		{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
		{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
		{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
		{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
		{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
	];

	return (
    <Container maxWidth="md">
			<DataGrid 
			rows={session? [...session.songs.map((s: Song) => {
				return {...s, ...{id: s.objectId, votes: (Math.random()*10).toFixed(0)}}
			})] : []}
			columns={columns} pageSize={5} autoHeight />
		</Container>	
	)
}

export default SessionPage;