const express = require('express');
const axios = require('axios');
const { createDoc, getDoc, duplicateDoc } = require('../sharedb/doc.js');

const adminKey = 'admin_key@&(Hcnc293)C8329h*(#(*C..1-r3k,';
const goHostName = 'http://123.115.107.83:8081';
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
  console.log('-----------');
  console.log(type, data)
  if (type !== 'create' && type !== 'get' && type !== 'duplicate' && type !== 'rename') {
    res.status(200).send({...errRsp, msg: 'err option type does not exist.'});
    return;
  }
  if (data === null || data === undefined || data?.microsoft_id === undefined) {
    res.status(200).send({ ...errRsp, msg: 'err data' });
    return;
  }
  if (type === 'create') {
    if (data?.canva_name === undefined) {
      res.status(200).send({ ...errRsp, msg: 'err canva_name undefined' });
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
  } else if (type === 'duplicate') {
    console.log('begin duplicate');
    if (data?.canva_name === undefined) {
      res.status(200).send({ ...errRsp, msg: 'err canva_name undefined' });
      return;
    }
    let ID;
    try {
      ID = await duplicateDoc(data.canva_name, data.old_Id);
    } catch (e) {
      console.log('duplicate fails');
      console.log(e);
    }
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
      console.log('query...');
      // console.log('query:', usrRsp.data);
      if (usrRsp.data.retc === -4) {
        res.status(200).send(errUserNotExistRsp);
      } else {
        res.status(200).send({ ...errRsp, msg: 'err unknown retc error' });
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
      res.status(200).send({ ...errRsp, msg: 'err update user failed' });
      return;
    }

    res.status(200).send({
      msg: 'ok',
      retc: 0,
      data: {
        canvas_id: ID,
      },
    });
  } else if (type === 'rename') {
    if (data?.canvas_name === undefined) {
      res.status(200).send({...errRsp, msg: 'err canvas_name undefined'});
      return;
    }
    const ID = data?.canvas_id;
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
      console.log('query...');
      // console.log('query:', usrRsp.data);
      if (usrRsp.data.retc === -4) {
        res.status(200).send(errUserNotExistRsp);
      } else {
        res.status(200).send({...errRsp, msg: 'err unknown retc error'});
      }
      return;
    }

    const newUser = usrRsp.data.data;
    const foundIndex = newUser.canvas.findIndex(canvas => canvas.id == ID);
    if (foundIndex === -1) {
      res.status(200).send({...errRsp, msg: 'err canvas id cannot be found'});
      return;
    }
    newUser.canvas[foundIndex] = {...newUser.canvas[foundIndex], name: data.canvas_name};
    console.log(newUser);
    
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
      res.status(200).send({...errRsp, msg: 'err updating failed'});
      return;
    }

    res.status(200).send({
      msg: 'ok',
      retc: 0,
      data: {
        canvas_id: ID,
      },
    });
  }
});

module.exports = docRouter;
