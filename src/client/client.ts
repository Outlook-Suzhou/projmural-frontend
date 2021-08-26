import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = 'wss://www.projmural.com/api/websocket';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
const docID = window.location.pathname.substring(10);
const doc = connection.get('canvas', docID);
doc.subscribe();

export default doc;
