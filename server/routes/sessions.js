const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()
const { body, validationResult } = require('express-validator');

apiRouter.get('/', function (req, res) {
	Knex.from('sessions').then((r) => res.send(r))
})

apiRouter.post('/:code', function (req, res) {
	Knex.insert({ code: req.params.code }).into('sessions')
		.then(() => res.status(201).send())
		.catch(e => {
			res.status(500).send()
		})
})

apiRouter.get('/:code', function (req, res) {
	Knex.from('sessions').where({ code: req.params.code }).then((session) => {
		session.length > 0 ?
			Knex.select('tracks.id', 'tracks.name', 'sessions_tracks.votes').from('tracks')
				.innerJoin('sessions_tracks', 'sessions_tracks.track_id', "tracks.id")
				.where({ session_code: req.params.code })
				.then((tracks) => {
					session[0].tracks = tracks
					res.send(session)
				}).catch((e) => console.log('e :>> ', e))
			:
			res.status(404).send()
	}
	)
})

apiRouter.get('/:code/tracks', function (req, res) {
	Knex.select('tracks.id', 'tracks.name', 'sessions_tracks.votes').from('tracks')
		.innerJoin('sessions_tracks', 'sessions_tracks.track_id', "tracks.id")
		.where({ session_code: req.params.code })
		.then((tracks) => {
			res.send(tracks)
		}).catch((e) => console.log('e :>> ', e))
})

const insertTrackIntoSession = async (session_code, track_id) => {
	return Knex.insert({ session_code: session_code, track_id: track_id }).into('sessions_tracks')
}

const incrementVotesBy1 = async (session_code, track_id) => {
	return Knex('sessions_tracks')
		.where({ session_code: session_code, track_id: track_id })
		.increment('votes')
}

apiRouter.post('/:code/tracks/:track_id/vote', function (req, res) {
	incrementVotesBy1(req.params.code, req.params.track_id).then(() => {
		res.status(204).send()
	})
})

apiRouter.post('/:code/tracks', [
	body('id').notEmpty().withMessage('id is required'),
	body('name').notEmpty().withMessage('name is required'),
], function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	Knex.insert(req.body).into('tracks')
		.then(() => {
			insertTrackIntoSession(req.params.code, req.body.id).then(() => res.status(201).send())
		})
		.catch(() => {
			insertTrackIntoSession(req.params.code, req.body.id)
				.then(() => res.status(201).send())
				.catch(() => {
					incrementVotesBy1(req.params.code, req.body.id).then(
						() => res.status(204).send())
				})
		})
})

module.exports = apiRouter