const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const websocketRouter = express.Router();

websocketRouter.use('/websocket', createProxyMiddleware({
  target: 'wss://localhost:8080', // target host
  ws: true, // proxy websockets
}));

module.exports = websocketRouter;
