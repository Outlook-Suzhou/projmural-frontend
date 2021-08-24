const http = require('http');
const express = require('express');
const path = require('path');
const cors = require('cors');

const docRouter = require('./route/docRouter.js');
const viewRouter = require('./views/view.js');

require('./sharedb/sharedb.js');

const isProduction = process.env.NODE_ENV !== 'development';
const createHTTPServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../build'))); // for parsing application/json
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use('/api', docRouter);
  app.use('/', viewRouter);
  const httpsServer = http.createServer(app);
  httpsServer.listen(8000, () => {
    console.log('HTTP Server running on port 8000');
  });
};

createHTTPServer(isProduction);
