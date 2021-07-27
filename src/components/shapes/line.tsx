import React from 'react';
import { Line as KonvaLine, Circle } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';

interface vector {
  x: number;
  y: number;
}

function getRect(start: vector, end: vector, weight: number) {
  const vectorAdd = (a:vector, b:vector) => [a.x + b.x, a.y + b.y];

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dxy = Math.sqrt(dx * dx + dy * dy);
  const cos = dx / dxy;
  const sin = dy / dxy;

  let ret: Array<number> = [];
  ret = ret.concat(vectorAdd(start, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(start, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(end, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(end, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  return ret;
}

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Line = ({ item, index, click }) => {
  // eslint-disable-next-line react/prop-types
  const pts = getRect(item.start, item.end, item.weight);
  return (
    <div>
      <KonvaLine
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
        points={pts}
        closed
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...shapeConfig}
        key={index}
        fill="black"
        draggable
        onClick={click}
        onDragMove={(e) => {
          const afterE = {
            weight: e.target.attrs.weight,
            x: e.target.attrs.x,
            y: e.target.attrs.y,
            end: {
              x: e.target.attrs.end.x, // + e.evt.movementX,
              y: e.target.attrs.end.y, // + e.evt.movementY,
            },
            start: {
              x: e.target.attrs.start.x, // + e.evt.movementX,
              y: e.target.attrs.start.y, // + e.evt.movementY,
            },
            type: 'LINE',
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
      />
      <Circle
        // eslint-disable-next-line react/prop-types
        x={doc.data.shapes[index].start.x + doc.data.shapes[index].x}
        // eslint-disable-next-line react/prop-types
        y={doc.data.shapes[index].start.y + doc.data.shapes[index].y}
        // eslint-disable-next-line react/prop-types
        radius={doc.data.shapes[index].weight}
        opacity={0.5}
        draggable
        onDragMove={(e) => {
          const afterE = Object.assign(doc.data.shapes[index], {
            start: {
              x: e.target.attrs.x - doc.data.shapes[index].x,
              y: e.target.attrs.y - doc.data.shapes[index].y,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        fill="blue"
      />
      <Circle
        // eslint-disable-next-line react/prop-types
        x={doc.data.shapes[index].end.x + doc.data.shapes[index].x}
        // eslint-disable-next-line react/prop-types
        y={doc.data.shapes[index].end.y + doc.data.shapes[index].y}
        // eslint-disable-next-line react/prop-types
        radius={doc.data.shapes[index].weight}
        opacity={0.5}
        draggable
        onDragMove={(e) => {
          const afterE = Object.assign(doc.data.shapes[index], {
            end: {
              x: e.target.attrs.x - doc.data.shapes[index].x,
              y: e.target.attrs.y - doc.data.shapes[index].y,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        fill="blue"
      />
    </div>
  );
};

export default Line;
