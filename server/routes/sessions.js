const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()

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

module.exports = apiRouter