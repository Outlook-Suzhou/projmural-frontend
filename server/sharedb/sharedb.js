const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const express = require('express');
const http = require('http');
const { backend } = require('./doc.js');

const isProduction = process.env.NODE_ENV !== 'development';

const startShareDBServer = () => {
  const app = express();
  app.use(express.static('static'));
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  wss.on('connection', (ws) => {
    const stream = new WebSocketJSONStream(ws);
    backend.listen(stream);
  });

  server.listen(8080);
  console.log('ShareDB is listening on http://localhost:8080');
};

startShareDBServer(isProduction);
