import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = process.env.NODE_ENV === 'production' ? 'wss://www.projmural.com/api/websocket' : 'wss://www.projmural.com/api/websocket';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
const docID = window.location.pathname.substring(10);
const doc = connection.get('projmural', docID);
const addSubscrible = (callback: Function) => {
  doc.subscribe(callback);
};

export { addSubscrible };
export default doc;
