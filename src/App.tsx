import {useState,useEffect} from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Stage, Layer, Rect, Text} from 'react-konva';
import Konva from "konva";

const sharedb = require('sharedb/lib/client');

// Open WebSocket connection to ShareDB server
const socket = new ReconnectingWebSocket("ws://10.94.88.30:8080");
const connection = new sharedb.Connection(socket);

// Create local Doc instance mapped to 'examples' collection document with id 'counter'
const doc = connection.get('examples', 'counter');

function App() {

  const [num,setNum] = useState();
  const [x,setX] = useState();
  const [y,setY] = useState();

  useEffect(()=>{
    // Get initial value of document and subscribe to changes
    doc.subscribe(showNumbers);
    doc.subscribe(move);
    // When document changes (by this client or any other, or the server),
    // update the number on the page
    doc.on('op', showNumbers);
    doc.on('op', move);

  }, [connection]);

  function increment() {
    // Increment `doc.data.numClicks`. See
    // https://github.com/ottypes/json0 for list of valid operations.
    doc.submitOp([{p: ['numClicks'], na: 1}]);
  }
  const showNumbers =()=>{
    setNum(doc.data.numClicks)
  }

  const move = () =>{
      setX(doc.data.rect[0])
      setY(doc.data.rect[1])
  }

  return (
    <div className="App">
      <button onClick={increment}> +1</button>
      {num}
      <div>
        <p>
          {x},{y}
        </p>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Some text on canvas" fontSize={15} />
            <Rect
                draggable={true}
                x={x}
                y={y}
                width={100}
                height={100}
                opacity={0.5}
                fill="red"
                shadowBlur={10}
                shadowOpacity={0.6}
                onDragMove={(e) =>{
                      doc.submitOp([{p: ['rect',0], ld: doc.data.rect[0],li:e.target.x()}]);
                      doc.submitOp([{p: ['rect',1], ld: doc.data.rect[1],li:e.target.y()}]);
                }}
            />
          </Layer>
        </Stage>
      </div>

    </div>
  );
}
export default App;
