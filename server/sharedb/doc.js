const ShareDB = require('sharedb');
const { v4: uuidv4 } = require('uuid');

const backend = new ShareDB();

const createPaintingID = () => (
  Buffer.from(uuidv4()).toString('base64')
);

const createDoc = () => {
  const connection = backend.connect();
  const ID = createPaintingID();
  const doc = connection.get('projmural', ID);
  doc.fetch((err) => {
    if (err) throw err;
    if (doc.type === null) {
      doc.create({
        shapes: [],
      });
    }
  });
  return ID;
};

const getDoc = (id) => {
  const connection = backend.connect();
  const doc = connection.get('projmural', id);
  const promise = new Promise((resolve) => {
    doc.fetch((err) => {
      console.log('fetch successfully');
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
