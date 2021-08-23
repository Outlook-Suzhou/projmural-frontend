const https = require('https');
const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');

const credentials = require('./credentials.js');
const docRouter = require('./route/docRouter.js');
const websocketRouter = require('./route/websocketRouter.js');
const viewRouter = require('./views/view.js');
const userRouter = require('./route/userRouter.js');

require('./sharedb/sharedb.js');

const isProduction = process.env.NODE_ENV !== 'development';
const createHTTPServer = (isHTTPS) => {
  const app = express();
  console.log(isHTTPS);
  app.use(express.static(path.join(__dirname, '../build')));
  app.use(cors());
  app.use(express.json()); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use('/api', docRouter);
  app.use('/api', [websocketRouter, userRouter]);
  app.use('/', viewRouter);
  const httpsServer = isHTTPS ? https.createServer(credentials, app) : http.createServer(app);
  if (isHTTPS) {
    httpsServer.listen(443, () => {
      console.log('HTTPS Server running on port 443');
    });
  } else {
    httpsServer.listen(8000, () => {
      console.log('HTTP Server running on port 8000');
    });
  }
};
createHTTPServer(isProduction);
