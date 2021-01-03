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
          'Bearer BQAtXNiOuSSaOdZRaOn25IWtuaU8NC9S_R2mUSuSCQ1XyaaVzo7wUFs3jp2nEgJ3cq1HpwQQgd7YYDwnwdQ',
      },
    },
  ).then((res) =>
    res.json().then((r) => {
      resp.send(r)
    }),
  )
})

module.exports = apiRouter
