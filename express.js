const proxy = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors')
const app = express();

require('./server/routes')(app);
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
app.use(cors())

const server = app.listen(process.env.PORT, () => {
  console.log(`Express web server started: http://localhost:${process.env.PORT}`);
});

require('./server/ws/sockets').init(server)

if (process.env.NODE_ENV == 'development') {
  app.use('*', proxy({ target: process.env.WEBPACK_SERVER, changeOrigin: true }));
  console.log(`Serving content from ${process.env.WEBPACK_SERVER}`);
} else {
  // app.use('*', (req, res) => {
  //   app.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // });
}

module.exports = app