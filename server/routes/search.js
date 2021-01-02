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
          'Bearer BQBRplk1vpE7qcpZ4kqWiBkPR2m__RRFQPTqmlgYY6c6wewRA8vYTQU_CAPVvDyrD7DBblx5QN3yjcj8TAk',
      },
    },
  ).then((res) =>
    res.json().then((r) => {
      resp.send(r)
    }),
  )
})

module.exports = apiRouter
