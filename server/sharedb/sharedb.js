const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const express = require('express');
const https = require('https');
const http = require('http');
const credentials = require('../credentials.js');
const { backend } = require('./doc.js');

const isProduction = process.env.NODE_ENV !== 'development';

const startShareDBServer = (isHTTPS) => {
  const app = express();
  app.use(express.static('static'));
  const server = isHTTPS ? https.createServer(credentials, app) : http.createServer(app);
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(8080);
  console.log('ShareDB is listening on http://localhost:8080');
};

startShareDBServer(isProduction);
