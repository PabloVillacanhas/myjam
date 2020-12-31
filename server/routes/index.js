const express = require('express')
const apiRouter = express.Router()


module.exports = function (app) {
  app.use('/api/search', require('./search'))
  app.use('/api/sessions', require('./sessions'))
}
