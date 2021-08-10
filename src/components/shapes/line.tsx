import React, { useEffect, useState } from 'react';
import { Line as KonvaLine, Circle } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';
import checkAdsorptionPoint from './adsorption';
import { useStateStore } from '../../store/store';

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
const Line = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    item, index, click, isSelected,
  } = props;
  const [circleOpacity, setCircleOpacity] = useState(1);
  const store = useStateStore();
  useEffect(() => {
    if (isSelected === true) setCircleOpacity(1);
    else setCircleOpacity(0);
  }, [isSelected]);
  const [adsorptionPoints, setAdsorptionPoints] = useState<Array<vector>>([]);
  useEffect(() => { if (store.currentIndex !== index) setAdsorptionPoints([]); }, [store.currentIndex]);
  const miniDistance = 20;
  return (
    <>
      {
        adsorptionPoints.map((point) => (
          <Circle
            x={point.x}
            y={point.y}
            radius={5}
            fill="red"
            stroke="1"
          />
        ))
      }
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
        draggable={store.drawing === 0}
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
          const mouse: vector = { x: e.target.attrs.x, y: e.target.attrs.y };
          let newPoint = mouse;
          let flag = false;
          doc.data.shapes.forEach((shape: BaseShapes.Shape, ind: number) => {
            if (flag || ind === index) return;
            const res = checkAdsorptionPoint(mouse, shape, miniDistance);
            if (res.flag === true) {
              newPoint = res.adsorptionVertex;
              setAdsorptionPoints(res.adsorptionPoints);
              flag = true;
            }
          });
          if (!flag) setAdsorptionPoints([]);
          const afterE = Object.assign(doc.data.shapes[index], {
            start: {
              x: newPoint.x - doc.data.shapes[index].x + Math.random() * 0.000001,
              y: newPoint.y - doc.data.shapes[index].y + Math.random() * 0.000001,
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
          const mouse: vector = { x: e.target.attrs.x, y: e.target.attrs.y };
          let newPoint = mouse;
          let flag = false;
          doc.data.shapes.forEach((shape: BaseShapes.Shape, ind: number) => {
            if (flag || ind === index) return;
            const res = checkAdsorptionPoint(mouse, shape, miniDistance);
            if (res.flag === true) {
              newPoint = res.adsorptionVertex;
              setAdsorptionPoints(res.adsorptionPoints);
              flag = true;
            }
          });
          if (!flag) setAdsorptionPoints([]);
          const afterE = Object.assign(doc.data.shapes[index], {
            end: {
              x: newPoint.x - doc.data.shapes[index].x + Math.random() * 0.000001,
              y: newPoint.y - doc.data.shapes[index].y + Math.random() * 0.000001,
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

export default Line;
