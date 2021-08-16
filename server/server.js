/* eslint-disable no-inner-declarations */
const https = require('https');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('./sharedb.js');
const credentials = require('./credentials.js');

// Create initial document then fire callback
if(process.env.NODE_ENV === 'production') {
  const app = express();
  app.use(express.static(path.join(__dirname, '../build')));

  const httpsServer = https.createServer(credentials, app);

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
}
