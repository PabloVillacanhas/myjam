const fetch = require('node-fetch')
const express = require('express')
const apiRouter = express.Router()

apiRouter.get('/', function (req, resp) {
  fetch(
    'https://api.spotify.com/v1/search?' +
    new URLSearchParams({
      q: req.query.q,
      type: req.query.type,
    }),
    {
      headers: {
        Authorization:
          'Bearer BQBKGMSHY2GCBLBU6oYFSQ1IIcqClApI5aozsshXdP8cXpGl6y-d4o0vbAx900lZlMGLjsXFnSpqSf4kJ7w',
      },
    },
  ).then((res) =>
    res.json().then((r) => {
      resp.send(r)
    }),
  )
})

module.exports = apiRouter
