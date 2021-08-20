const express = require('express');
const { createDoc } = require('../sharedb/doc.js');

const docRouter = express.Router();

docRouter.use('/doc', (req, res) => {
  const { type, data } = req.body;
  if (type !== 'create' && type !== 'get') {
    res.status(200).send({
      msg: 'err',
      rect: -1,
    });
    return;
  }
  if (data === null || data === undefined || data?.microsoft_id === undefined) {
    res.status(200).send({
      msg: 'err',
      rect: -1,
    });
    return;
  }
  const ID = createDoc();
  res.status(200).send({
    msg: 'ok',
    rect: 0,
    data: {
      canvas_id: ID,
    },
  });
});

module.exports = docRouter;
