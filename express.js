const path = require('path')
var proxy = require('http-proxy-middleware');
const express = require('express');
var cors = require('cors')
const app = express();
const portNumber = process.env.PORT || 3000
const sourceDir = 'dist';
const apiRouter = require('./server/routes')(app);

app.use(cors())

// app.use('/api', apiRouter);

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
});

if (process.env.NODE_ENV == 'development') {
  require('dotenv').config();
  app.use('*', proxy({ target: 'http://localhost:8080', changeOrigin: true }));
  console.log(`Serving content from http://localhost:8080`);
} else {
  // app.use('*', (req, res) => {
  //   app.sendFile(path.join(__dirname, 'dist', 'index.html'));
  // });
}

module.exports = app