const ShareDB = require('sharedb');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const db = require('sharedb-mongo')('mongodb://123.115.107.82:27017/projmural', { mongoOptions: {} });

const backend = new ShareDB({ db });

const createPaintingID = () => {
  const md5 = crypto.createHash('md5');
  return md5.update(Buffer.from(uuidv4()).toString('base64')).digest('hex').slice(-8);
};

const createDoc = (canvaName, oldDoc) => {
  const connection = backend.connect();
  // console.log(oldDoc)
  const ID = createPaintingID();
  const doc = connection.get('canvas', ID);
  const promise = new Promise((resolve) => {
    doc.fetch((err) => {
      // if (err) throw err;
      if (err)
        console.log(err);
      const shapes = (oldDoc?.data?.shapes ? oldDoc?.data?.shapes : []);
      console.log('shapes: ', shapes)
      if (doc.type === null) {
        doc.create({
          shapes: shapes,
          users: [],
          canvaName,
        }, () => {
          resolve(ID);
        });
      }
    });
  });
  return promise;
};

const duplicateDoc = async (canvaName, oldId) => {
  // const oldId = url.substring(10);
  console.log('oldId', oldId);
  const oldDoc = await getDoc(oldId);
  console.log('old doc', oldDoc);
  console.log('old doc data: ', oldDoc.data);
  return createDoc(canvaName, oldDoc);
}

const getDoc = (id) => {
  if (id === '') {
    return Promise.resolve({
      type: null,
    });
  }
  const connection = backend.connect();
  const doc = connection.get('canvas', id);
  const promise = new Promise((resolve) => {
    doc.fetch((err) => {
      // if (err) throw err;
      if (err)
        console.log(err);
      console.log('fetch successfully');
      // console.log(doc);
      resolve(doc);
    });
  });
  return promise;
};

module.exports = {
  backend,
  createDoc,
  getDoc,
  duplicateDoc,
};
