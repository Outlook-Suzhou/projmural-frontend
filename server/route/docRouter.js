const express = require('express');
const { createDoc, getDoc } = require('../sharedb/doc.js');

const docRouter = express.Router();
const errRsp = {
  msg: 'err',
  rect: -1,
};

docRouter.post('/doc', async (req, res) => {
  const { type, data } = req.body;
  if (type !== 'create' && type !== 'get') {
    res.status(200).send(errRsp);
    return;
  }
  if (data === null || data === undefined || data?.microsoft_id === undefined) {
    res.status(200).send(errRsp);
    return;
  }
  if (type === 'create') {
    if (data?.canvaName === undefined) {
      res.status(200).send(errRsp);
      return;
    }
    const ID = createDoc(data.canvaName);
    res.status(200).send({
      msg: 'ok',
      rect: 0,
      data: {
        canvas_id: ID,
      },
    });
  } else if (type === 'get') {
    const doc = await getDoc(data.canvas_id);
    res.status(200).send({
      msg: 'ok',
      rect: 0,
      data: {
        canvas_exist: doc.type !== null,
      },
    });
  }
});

module.exports = docRouter;
