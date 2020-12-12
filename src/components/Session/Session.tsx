import React, { useEffect } from 'react'

interface Props {
	sessionCode: string
}

export const Session = ({sessionCode}: Props) => {

	useEffect(() => {
		console.log('props.code', sessionCode)
	}, [sessionCode])

	return (
		<div>
			The session code is {sessionCode}
		</div>
	)
}
