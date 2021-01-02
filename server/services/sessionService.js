'use strict'

const createBaseCRUD = require('./baseCRUD')
const knex = require('../../db/knex')
const tracksService = require('./tracksService')(knex)

const name = 'Session'
const tableName = 'sessions'

// Properties that are allowed to be selected from the database for reading.
const selectableProps = [
	'id',
	'updated_at',
	'created_at'
]

module.exports = knex => {
	const crud = createBaseCRUD({
		knex,
		name,
		tableName,
		selectableProps
	})

	const findOneWithTracks = (filters) => {
		return crud.findOne(filters).then((session) =>
			session ?
				tracksService.findTracksOfSession(filters.id)
					.then((tracks) => { session.tracks = tracks; return session })
				: session
		)
	}

	return {
		...crud,
		findOneWithTracks
	}
}