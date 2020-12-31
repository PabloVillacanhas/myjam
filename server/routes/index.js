const express = require('express')
const apiRouter = express.Router()

var spotifyRouter = require('./search')

module.exports = function (app) {
  apiRouter.use(express.json())
  apiRouter.use('/api/search', spotifyRouter)
  apiRouter.use('/api/sessions', sessionsRouter)
}
