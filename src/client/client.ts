import ReconnectingWebSocket from 'reconnecting-websocket';

const sharedb = require('sharedb/lib/client');

const ipAddress = process.env.NODE_ENV === 'production' ? 'wss://www.projmural.com/api/websocket' : 'ws://localhost:8080';

const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);
const docID = window.location.pathname.substring(10);
const doc = connection.get('projmural', docID);
doc.subscribe();

export default doc;
