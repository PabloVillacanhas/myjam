'use strict'

const createBaseCRUD = require('./baseCRUD')

const name = 'Track'
const tableName = 'tracks'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
	'id',
	'name',
]

module.exports = knex => {
	const crud = createBaseCRUD({
		knex,
		name,
		tableName,
		selectableProps
	})

	// Augment default `create` function to include custom `beforeSave` logic.
	const findTracksOfSession = sessionId => {
		return knex.select([...selectableProps, 'sessions_tracks.votes']).from('tracks')
			.innerJoin('sessions_tracks', 'sessions_tracks.track_id', "tracks.id")
			.where({ session_id: sessionId })
			.catch(e => console.log('e', e))
	}

	return {
		...crud,
		findTracksOfSession
	}
}