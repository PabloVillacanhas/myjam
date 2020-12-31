const express = require('express')
const apiRouter = express.Router()


module.exports = function (app) {
  apiRouter.use(express.json())
  app.use('/api/search', require('./search'))
  app.use('/api/sessions', require('./sessions'))
}
