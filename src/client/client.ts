import ReconnectingWebSocket from 'reconnecting-websocket';
// import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from "konva";

const sharedb = require('sharedb/lib/client');

console.log(window.location.href);

// Open WebSocket connection to ShareDB server
const ipAddress = process.env.NODE_ENV === 'production' ? 'wss://www.projmural.com/websocket' : 'ws://localhost:8080';
console.log(process.env.NODE_ENV);
const socket = new ReconnectingWebSocket(`${ipAddress}`);
const connection = new sharedb.Connection(socket);

// Create local Doc instance mapped to 'examples' collection document with id 'counter'
const doc = connection.get('examples', 'counter');
doc.subscribe();

export default doc;
