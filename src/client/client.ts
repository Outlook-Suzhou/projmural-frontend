/* eslint-disable no-restricted-globals */
import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = 'ws://localhost:5000/api/websocket';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
console.log(connection);
const doc = { value: null };
window.onerror = () => {
  location.reload();
};
function getCurrentDoc(callback?: Function) {
  const docID = window.location.pathname.substring(10);
  doc.value = connection.get('canvas', docID);
  // eslint-disable-next-line no-restricted-globals
  if (doc.value) {
    ((doc.value) as any).subscribe(() => {
      if (callback) {
        callback();
      }
    });
  }
  return doc as any;
}
export default getCurrentDoc;
