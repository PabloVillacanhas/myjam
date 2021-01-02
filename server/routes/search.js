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
          'Bearer BQCtK2f63qY-JF20eCmMrpfWZguLc1kZO62AWe5tPgQduI_GEKF2m-P3dWy6L2HHygW63huz_Fy0uKctYxU',
      },
    },
  ).then((res) =>
    res.json().then((r) => {
      resp.send(r)
    }),
  )
})

module.exports = apiRouter
