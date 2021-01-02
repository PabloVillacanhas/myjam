const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()
const { body, validationResult } = require('express-validator');

const sessionsController = require('../controllers/sessionsController')

apiRouter.get('/', sessionsController.findAll_session)

apiRouter.post('/', sessionsController.create_session)

apiRouter.get('/:id', sessionsController.get_session)

apiRouter.get('/:id/tracks', function (req, res) {
	Knex.select('tracks.id', 'tracks.name', 'sessions_tracks.votes').from('tracks')
		.innerJoin('sessions_tracks', 'sessions_tracks.track_id', "tracks.id")
		.where({ session_id: req.params.id })
		.then((tracks) => {
			res.send(tracks)
		}).catch((e) => console.log('e :>> ', e))
})

const insertTrackIntoSession = async (session_id, track_id) => {
	return Knex.insert({ session_id: session_id, track_id: track_id }).into('sessions_tracks')
}

const incrementVotesBy1 = async (session_id, track_id) => {
	return Knex('sessions_tracks')
		.where({ session_id: session_id, track_id: track_id })
		.increment('votes')
}

apiRouter.post('/:id/tracks/:track_id/vote', function (req, res) {
	incrementVotesBy1(req.params.id, req.params.track_id).then(() => {
		res.status(204).send()
	})
})

apiRouter.post('/:id/tracks', [
	body('id').notEmpty().withMessage('id is required'),
	body('name').notEmpty().withMessage('name is required'),
], function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	Knex.insert(req.body).into('tracks')
		.then(() => {
			insertTrackIntoSession(req.params.id, req.body.id).then(() => res.status(201).send())
		})
		.catch(() => {
			insertTrackIntoSession(req.params.id, req.body.id)
				.then(() => res.status(201).send())
				.catch(() => {
					incrementVotesBy1(req.params.id, req.body.id).then(
						() => res.status(204).send())
				})
		})
})

module.exports = apiRouter