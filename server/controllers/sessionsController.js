// Display list of all BookInstances.
const knex = require('../../db/knex')
const sessionService = require('../services/sessionService')(knex)

exports.findAll_session = function (req, res) {
	sessionService.findAll().then((sessions) => res.send(sessions))
};

exports.get_session = function (req, res) {
	sessionService.findOneWithTracks({ id: req.params.id })
		.then((session) => session ? res.send(session) : res.status(404).send())
		.catch(e => res.status(500).send(e))
};

exports.create_session = function (req, res) {
	sessionService.create(req.body)
		.then(() => res.status(201).send())
		.catch(e => {
			res.status(500).send()
		})
};