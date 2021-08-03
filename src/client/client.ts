import ReconnectingWebSocket from 'reconnecting-websocket';
// import { Stage, Layer, Rect, Text } from 'react-konva';
// import Konva from "konva";

const sharedb = require('sharedb/lib/client');

// Open WebSocket connection to ShareDB server
const socket = new ReconnectingWebSocket('ws://40.83.97.177:8080');
const connection = new sharedb.Connection(socket);

// Create local Doc instance mapped to 'examples' collection document with id 'counter'
const doc = connection.get('examples', 'counter');
doc.subscribe();

export default doc;
