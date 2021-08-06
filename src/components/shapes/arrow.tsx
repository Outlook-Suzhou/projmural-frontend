import React, { useEffect, useState } from 'react';
import { Line as KonvaLine, Circle } from 'react-konva';
import Vector from './vector';
import doc from '../../client/client';
import shapeConfig from './shape_config';

interface vector {
  x: number;
  y: number;
}

function getRect(start: vector, end: vector, weight: number) {
  const vectorAdd = (a: vector, b: vector) => [a.x + b.x, a.y + b.y];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dxy = Math.sqrt(dx * dx + dy * dy);
  const cos = dx / dxy;
  const sin = dy / dxy;

  const realEnd = {
    x: end.x - cos * weight,
    y: end.y - sin * weight,
  };

  let ret: Array<number> = [];
  ret = ret.concat(vectorAdd(start, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(start, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(realEnd, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(realEnd, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  return ret;
}

function getArrow(start:vector, end: vector, weight: number, arrowSize: number) {
  const startToEnd = Vector.init(Vector.sub(end, start));
  let direction = Vector.rotate(startToEnd, (-3 * Math.PI) / 4);
  let now = end;
  let ret: number[] = [];
  ret = ret.concat(Vector.toList(now));

  now = Vector.add(now, Vector.mulN(direction, arrowSize));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, arrowSize - weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, arrowSize - weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, weight));
  ret = ret.concat(Vector.toList(now));
  return ret;
}

// @ts-ignore
const Arrow = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    item, index, click, isSelected,
  } = props;

  const [circleOpacity, setCircleOpacity] = useState(1);
  useEffect(() => {
    if (circleOpacity === 0) setCircleOpacity(1);
    else setCircleOpacity(0);
  }, [isSelected]);
  return (
    <>
      <KonvaLine
        {...item}
        {...shapeConfig}
        // eslint-disable-next-line react/prop-types
        points={getArrow(item.start, item.end, item.weight, item.arrowSize)}
        closed
        fill="black"
      />
      <KonvaLine
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...item}
        // eslint-disable-next-line react/prop-types
        points={getRect(item.start, item.end, item.weight)}
        closed
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...shapeConfig}
        key={index}
        fill="black"
        draggable
        onClick={click}
        onDragMove={(e) => {
          const afterE = Object.assign(doc.data.shapes[index], {
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          });
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
        opacity={circleOpacity}
        draggable
        onClick={click}
        onDragMove={(e) => {
          const afterE = Object.assign(doc.data.shapes[index], {
            start: {
              x: e.target.attrs.x - doc.data.shapes[index].x,
              y: e.target.attrs.y - doc.data.shapes[index].y,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        fill="white"
        stroke="1"
      />
      <Circle
        // eslint-disable-next-line react/prop-types
        x={doc.data.shapes[index].end.x + doc.data.shapes[index].x}
        // eslint-disable-next-line react/prop-types
        y={doc.data.shapes[index].end.y + doc.data.shapes[index].y}
        // eslint-disable-next-line react/prop-types
        radius={doc.data.shapes[index].weight}
        opacity={circleOpacity}
        draggable
        onClick={click}
        onDragMove={(e) => {
          const afterE = Object.assign(doc.data.shapes[index], {
            end: {
              x: e.target.attrs.x - doc.data.shapes[index].x,
              y: e.target.attrs.y - doc.data.shapes[index].y,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        fill="white"
        stroke="1"
      />
    </>
  );
};

export default Arrow;
