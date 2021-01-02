const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()
const { body, validationResult } = require('express-validator');

const sessionsController = require('../controllers/sessionsController')
const trackValidator = require('../validators/validateTrack')

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

apiRouter.post('/:id/tracks/:track_id/vote', sessionsController.vote_track)

apiRouter.post('/:id/tracks', trackValidator.validateTrack, sessionsController.post_trackIntoSession)

module.exports = apiRouter