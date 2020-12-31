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
          'Bearer BQB9yFtFojesTQeCse4epoNoSvAPyHc6sZmkUaOe5UXhV1Tl1l38TTZI1K7mu5Q7bbTT2uPf_1YeqFjQyfI',
      },
    },
  ).then((res) =>
    res.json().then((r) => {
      resp.send(r)
    }),
  )
})

module.exports = apiRouter
