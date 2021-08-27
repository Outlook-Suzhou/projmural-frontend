import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = 'wss://www.projmural.com/api/websocket';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
const doc = { value: null };
function getCurrentDoc(callback?: Function) {
  const docID = window.location.pathname.substring(10);
  doc.value = connection.get('canvas', docID);
  if (doc.value) {
    ((doc.value) as any).subscribe(() => {
      console.log(doc.value);
      if (callback) {
        callback();
      }
    });
  }
  return doc as any;
}
export default getCurrentDoc;
