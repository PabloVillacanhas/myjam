// Display list of all BookInstances.
const knex = require('../../db/knex')
const sessionService = require('../services/sessionService')(knex)

exports.get_session = function (req, res) {
	sessionService.findOne(req.body)
		.then(() => res.status(201).send())
		.catch(e => {
			res.status(500).send()
		})
};

exports.create_session = function (req, res) {
	sessionService.create(req.body)
		.then(() => res.status(201).send())
		.catch(e => {
			res.status(500).send()
		})
};

exports.get_session = function (req, res) {
	res.send('NOT IMPLEMENTED: session get: ' + req.params.id);
};