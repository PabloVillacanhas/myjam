const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()

apiRouter.get('/', function (req, res) {
	Knex.from('sessions').then((r) => res.send(r))
})

apiRouter.get('/:code', function (req, res) {
	Knex.from('sessions').where({ code: req.params.code }).then((r) => res.send(r))
})

module.exports = apiRouter