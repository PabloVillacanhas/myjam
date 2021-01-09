const express = require('express')
const Knex = require('../../db/knex')
const apiRouter = express.Router()

const sessionsController = require('../controllers/sessionsController')
const trackValidator = require('../validators/validateTrack')

/**
 * Get all sessions
 * @route GET /api/sessions
 * @group Sessions - Operations about sessions
 * @returns {Array.<Session>} 200 - An array of session info
 */
apiRouter.get('/', sessionsController.findAll_session)

/**
 * Get all sessions
 * @route POST /api/sessions
 * @group Sessions - Operations about sessions
 * @returns {Response} 204
 */
apiRouter.post('/', sessionsController.create_session)

/**
 * Get some session
 * @route GET /api/sessions/:id
 * @group Sessions - Operations about sessions
 * @returns {Session} 200
 */
apiRouter.get('/:session_id', sessionsController.get_session)

/**
 * Get all sessions
 * @route POST /api/sessions/:session_id/tracks/:track_id/vote
 * @group Sessions - Operations about sessions
 * @returns {Response} 204
 */
apiRouter.post('/:session_id/tracks/:track_id/vote', sessionsController.vote_track)

/**
 * Get all sessions
 * @route POST /api/sessions/:session_id/tracks
 * @group Sessions - Operations about sessions
 * @returns {Response} 204
 */
apiRouter.post('/:session_id/tracks', trackValidator.validateTrack, sessionsController.post_trackIntoSession)

module.exports = apiRouter