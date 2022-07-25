/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

let ipAddress = 'ws://localhost:5000/api/websocket';

if (process.env.REACT_APP_ENV === 'remote') {
  ipAddress = 'wss://dev.projmural2.com/api/websocket';
}

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
console.log(connection);
const doc = { value: null };
window.onerror = () => {
  location.reload();
};

export function getCurrentDocId() {
  return window.location.pathname.substring(10);
}

function getCurrentDoc(docId?: string, callback?: Function) {
  const currentDocId = (docId || getCurrentDocId());
  doc.value = connection.get('canvas', currentDocId);
  // eslint-disable-next-line no-restricted-globals
  if (doc.value) {
    ((doc.value) as any).subscribe(() => {
      if (callback) {
        callback();
      }
    });
    return doc as any;
  }
  return undefined;
}

export function getDocById(docID: string, callback?: Function) {
  const retDoc = { value: null };
  const newSocket = new ReconnectingWebSocket(`${ipAddress}`);
  const newConnection = new sharedb.Connection(newSocket);
  retDoc.value = newConnection.get('canvas', docID);

  if (retDoc.value) {
    ((retDoc.value) as any).subscribe(() => {
      if (callback) {
        callback();
      }
    });
  }
  return retDoc as any;
}

export function getQueryByIds(docIds: Array<string>) {
  const newSocket = new ReconnectingWebSocket(`${ipAddress}`);
  const newConnection = new sharedb.Connection(newSocket);

  const query = newConnection.createSubscribeQuery('canvas', { _id: { $in: docIds } });
  console.log(query);
  return query as any;
}

export default getCurrentDoc;
