const path = require('path')
var proxy = require('http-proxy-middleware');
const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

// app.use(express.static(sourceDir));
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  app.use('*', proxy({ target: 'http://localhost:8080', changeOrigin: true }));
  console.log(`Serving content from http://localhost:8080`);
}

app.set('views', path.join(__dirname, '/src/views'));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
});

app.use('*', (req, res) => {
  express.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.get('/api', function (req, res) {
  res.send('api');
});