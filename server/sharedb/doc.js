const ShareDB = require('sharedb');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
// const db = require('sharedb-mongo')('mongodb://localhost:27017/projmural', { mongoOptions: {} });

const backend = new ShareDB();

const createPaintingID = () => {
  const md5 = crypto.createHash('md5');
  return md5.update(Buffer.from(uuidv4()).toString('base64')).digest('hex').slice(-8);
};

const createDoc = (canvaName) => {
  const connection = backend.connect();
  const ID = createPaintingID();
  const doc = connection.get('projmural', ID);
  const promise = new Promise((resolve) => {
    doc.fetch((err) => {
      if (err) throw err;
      if (doc.type === null) {
        doc.create({
          shapes: [],
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

const getDoc = (id) => {
  if (id === '') {
    return Promise.resolve({
      type: null,
    });
  }
  const connection = backend.connect();
  const doc = connection.get('projmural', id);
  const promise = new Promise((resolve) => {
    doc.fetch((err) => {
      console.log('fetch successfully');
      console.log(doc);
      if (err) throw err;
      resolve(doc);
    });
  });
  return promise;
};

module.exports = {
  backend,
  createDoc,
  getDoc,
};
