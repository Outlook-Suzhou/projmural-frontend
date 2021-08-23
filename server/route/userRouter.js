const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const userRouter = express.Router();

userRouter.use('/', createProxyMiddleware({
  target: 'localhost:8081/api', // target host
}));

module.exports = userRouter;
