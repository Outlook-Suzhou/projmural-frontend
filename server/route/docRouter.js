const express = require('express');
const axios = require('axios');
const { createDoc, getDoc } = require('../sharedb/doc.js');

const adminKey = 'admin_key@&(Hcnc293)C8329h*(#(*C..1-r3k,';
const goHostName = 'http://localhost:8081';
const postConfig = {
  headers: {
    Authorization: adminKey,
  },
};
const docRouter = express.Router();
const errRsp = {
  msg: 'err',
  retc: -1,
};
const errUserNotExistRsp = {
  msg: 'user not exist',
  retc: -4,
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
    if (data?.canva_name === undefined) {
      res.status(200).send(errRsp);
      return;
    }
    const ID = await createDoc(data.canva_name);
    let usrRsp;
    try {
      usrRsp = await axios.post(`${goHostName}/api/user`, {
        type: 'query',
        data: {
          microsoft_id: data.microsoft_id,
        },
      }, postConfig);
    } catch (e) {
      console.log(e);
    }
    if (usrRsp.data.retc !== 0) {
      console.log('query:', usrRsp.data);
      if (usrRsp.data.retc === -4) {
        res.status(200).send(errUserNotExistRsp);
      } else {
        res.status(200).send(errRsp);
      }
      return;
    }

    const newUser = {
      ...usrRsp.data.data,
    };
    newUser.canvas.unshift({
      id: ID,
      name: data.canva_name,
      recent_open: 0,
    });
    let updateRsp;
    try {
      updateRsp = await axios.post(`${goHostName}/api/user`, {
        type: 'update',
        data: newUser,
      }, postConfig);
    } catch (e) {
      console.log(e);
    }
    if (updateRsp.data.retc !== 0) {
      console.log('update:', usrRsp.data);
      res.status(200).send(errRsp);
      return;
    }

    res.status(200).send({
      msg: 'ok',
      retc: 0,
      data: {
        canvas_id: ID,
      },
    });
  } else if (type === 'get') {
    const doc = await getDoc(data.canvas_id);
    res.status(200).send({
      msg: 'ok',
      retc: 0,
      data: {
        canvas_exist: doc.type !== null,
      },
    });
  }
});

module.exports = docRouter;
