const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()
const { body, validationResult } = require('express-validator/check');

apiRouter.get('/', function (req, res) {
	Knex.from('sessions').then((r) => res.send(r))
})

apiRouter.get('/:code', function (req, res) {
	Knex.from('sessions').where({ code: req.params.code }).then((r) => res.send(r))
})

apiRouter.get('/:code/tracks', function (req, res) {
	Knex.from('sessions').where({ code: req.params.code }).then((session) =>
		Knex.select('track_id').from('sessions_tracks').where({ session_code: req.params.code })
			.then(track_ids => {
				Knex.from('tracks').whereIn(['id'], track_ids.map(t => t.track_id)).then(
					tracks => {
						session[0].tracks = tracks
						res.send(session)
					}
				)
			})
	)
})

apiRouter.post('/:code/tracks', [
	body('id').notEmpty().withMessage('id should not be null'),
	body('name').notEmpty().withMessage('name should not be null'),
], function (req, res) {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	res.status(201).send()
})

module.exports = apiRouter