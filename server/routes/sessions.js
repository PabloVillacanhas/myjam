const express = require('express')
const apiRouter = express.Router()

apiRouter.get('/', function (req, resp) {
	console.log('eh?');
})

module.exports = apiRouter