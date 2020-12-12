import React, { useEffect } from 'react'
import {useParams
} from "react-router-dom";
interface Props {
}

export const Session = ({}: Props) => {

	let { id } = useParams();
	
	useEffect(() => {
		console.log('props.code', id)
	}, [])

	return (
		<div>
			The session code is {id}
		</div>
	)
}
