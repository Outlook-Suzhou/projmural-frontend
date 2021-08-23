const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const websocketRouter = express.Router();

websocketRouter.use('/api', createProxyMiddleware({
  target: 'wss://localhost:8081', // target host
}));

module.exports = websocketRouter;
