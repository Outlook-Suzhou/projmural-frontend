const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const fs = require('fs');
const path = require('path');
const credentials = require('./credentials.js');
const express = require('express');
const https = require('https');


const backend = new ShareDB();
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
if(process.env.NODE_ENV === 'development') {
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
  // const privateKey = fs.readFileSync(path.join(__dirname, '../privkey.pem'), 'utf8');
  // const certificate = fs.readFileSync(path.join(__dirname, '../fullchain.pem'), 'utf8');

  // const credentials = {
  //   key: privateKey,
  //   cert: certificate,
  //   ca: certificate,
  // };
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
}