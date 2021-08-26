import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = 'wss://www.projmural.com/api/websocket';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
let doc;
function getCurrentDoc(callback?: Function) {
  const docID = window.location.pathname.substring(10);
  doc = connection.get('projmural', docID);
  doc.subscribe(() => {
    if (callback) {
      callback();
    }
  });
  return doc;
}
export default getCurrentDoc;
