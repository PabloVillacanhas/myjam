const path = require('path')
const express = require('express');
const app = express();
const portNumber = 3000;
const sourceDir = 'dist';

app.use(express.static(sourceDir));
app.set('views', path.join(__dirname, '/src/views'));

app.listen(portNumber, () => {
  console.log(`Express web server started: http://localhost:${portNumber}`);
  console.log(`Serving content from /${sourceDir}/`);
});

app.get('/about', function (req, res) {
  res.send('about');
});