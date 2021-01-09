const proxy = require('http-proxy-middleware');
const express = require('express');
const cors = require('cors')
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
let options = {
  swaggerDefinition: {
    info: {
      description: 'This is a sample server',
      title: 'Swagger',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    basePath: '/v1',
    produces: [
      "application/json",
      "application/xml"
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname, //app absolute path
  files: ['./server/routes/**/*.js', './server/models/**/*.js'] //Path to the API handle folder
};
expressSwagger(options)

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