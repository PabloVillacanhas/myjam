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

	const incrementVotesBy1 = async (session_id, track_id) => {
		return knex('sessions_tracks')
			.returning(['votes', 'track_id'])
			.where({ session_id: session_id, track_id: track_id })
			.increment('votes')
	}

	const insertTrackIntoSession = async (session_id, track) => {
		return knex.insert(track).into('tracks')
			.then((track) =>
				knex.insert({ session_id: session_id, track_id: track.id }).into('sessions_tracks')
			)
			.catch(() =>
				//Already into tracks
				knex.insert({ session_id: session_id, track_id: track.id }).into('sessions_tracks')
					.catch(() =>
						//Already in session
						incrementVotesBy1(session_id, track.id)
					)
			)
	}

	return {
		...crud,
		findOneWithTracks,
		incrementVotesBy1,
		insertTrackIntoSession
	}
}