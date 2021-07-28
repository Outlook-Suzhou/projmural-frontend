const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');
const path = require('path');

const backend = new ShareDB();

// Create initial document then fire callback
function createDoc(callback) {
  const connection = backend.connect();
  const doc = connection.get('examples', 'counter');
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({
        shapes: [{
          x: 20, y: 50, width: 100, height: 100, type: 'RECTANGLE', rotation: 0,
        }, {
          x: 20, y: 50, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE',
        }],
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
