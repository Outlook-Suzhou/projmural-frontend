const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const websocketRouter = express.Router();

websocketRouter.use('/api', createProxyMiddleware({
  target: 'http://localhost:8081/api', // target host
}));

module.exports = websocketRouter;
