const express = require('express')
const apiRouter = express.Router()

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

module.exports = function (app) {
  apiRouter.use(express.json())
  app.use('/api/search', require('./search'))
  app.use('/api/sessions', jsonParser, require('./sessions'))
}
