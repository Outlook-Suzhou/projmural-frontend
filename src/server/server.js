const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const path = require('path');
const db = require('sharedb-mongo')('mongodb://localhost:27017/test', { mongoOptions: {} });

const backend = new ShareDB({ db });

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get('projectmural', 'test');
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

// HTTP server
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(8000);
console.log('HTTPServer is lisening on http://localhost:8000');
