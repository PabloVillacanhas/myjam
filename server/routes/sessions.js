const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()
const { body, validationResult } = require('express-validator');

const sessionsController = require('../controllers/sessionsController')
const trackValidator = require('../validators/validateTrack')

apiRouter.get('/', sessionsController.findAll_session)

apiRouter.post('/', sessionsController.create_session)

apiRouter.get('/:id', sessionsController.get_session)

apiRouter.post('/:id/tracks/:track_id/vote', sessionsController.vote_track)

apiRouter.post('/:id/tracks', trackValidator.validateTrack, sessionsController.post_trackIntoSession)

module.exports = apiRouter