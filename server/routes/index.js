const express = require('express')
const apiRouter = express.Router()

var spotifyRouter = require('./search')

module.exports = function (app) {
  console.log('hola')
  apiRouter.use(express.json())
  apiRouter.use('/api/search', spotifyRouter)
}
