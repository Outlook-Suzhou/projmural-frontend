const https = require('https');
const http = require('http');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const credentials = require('./credentials.js');
const docRouter = require('./route/docRouter.js');
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

  const httpsServer = isHTTPS ? https.createServer(credentials, app) : http.createServer(app);
  if (isHTTPS) {
    app.use('/websocket', createProxyMiddleware({
      target: 'wss://localhost:8080', // target host
      ws: true, // proxy websockets
    }));

    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

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
