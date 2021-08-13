/* eslint-disable no-inner-declarations */
const http = require('http');
const fs = require('fs');
const https = require('https');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const backend = new ShareDB();

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get('examples', 'counter');
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({
        shapes: [],
      }, callback);
      return;
    }
    callback();
  });
}
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    const app = express();
    app.use(express.static('static'));
    const server = http.createServer(app);

    // Connect any incoming WebSocket connection to ShareDB
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
      const stream = new WebSocketJSONStream(ws);
      backend.listen(stream);
    });

    server.listen(8080);
    console.log('ShareDB is listening on http://localhost:8080');
  }
  createDoc(startServer);
} else {
  const privateKey = fs.readFileSync('./privkey.pem', 'utf8');
  const certificate = fs.readFileSync('./fullchain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: certificate,
  };
  function startServer() {
    // Create a web server to serve files and listen to WebSocket connections
    const app = express();
    app.use(express.static('static'));
    const server = https.createServer(credentials, app);

    // Connect any incoming WebSocket connection to ShareDB
    const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
      const stream = new WebSocketJSONStream(ws);
      backend.listen(stream);
    });

    server.listen(8080);
    console.log('ShareDB is listening on http://localhost:8080');
  }
  createDoc(startServer);

  // HTTP server
  const app = express();
  app.use(express.static(path.join(__dirname, 'build')));
  const httpsServer = https.createServer(credentials, app);

  app.use('/websocket', createProxyMiddleware({
    target: 'wss://localhost:8080', // target host
    ws: true, // proxy websockets
  }));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}
