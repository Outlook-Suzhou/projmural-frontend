import React, { useEffect, useState } from 'react';
import { Line as KonvaLine, Circle } from 'react-konva';
import Vector from './vector';
import doc from '../../client/client';
import shapeConfig from './shape_config';
import checkAdsorptionPoint from './adsorption';
import { useDispatchStore, useStateStore } from '../../store/store';
import globalConfig from './global_config';

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

  let ret: Array<number> = [];
  ret = ret.concat(vectorAdd(start, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(start, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(end, { x: (weight * sin) / 2, y: -(weight * cos) / 2 }));
  ret = ret.concat(vectorAdd(end, { x: -(weight * sin) / 2, y: (weight * cos) / 2 }));
  return ret;
}

function getArrow(start:vector, end: vector, weight: number, arrowSize: number) {
  const startToEnd = Vector.init(Vector.sub(end, start));
  let direction = Vector.rotate(startToEnd, (-3 * Math.PI) / 4);
  let now = Vector.add(end, Vector.mulN(startToEnd, weight / 2));
  let ret: number[] = [];
  ret = ret.concat(Vector.toList(now));

  now = Vector.add(now, Vector.mulN(direction, arrowSize));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  const tailPoint1: vector = Vector.add(now, Vector.mulN(direction, weight / 2));
  now = Vector.add(now, Vector.mulN(direction, weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, arrowSize - weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, Math.PI / 2);
  now = Vector.add(now, Vector.mulN(direction, arrowSize - weight));
  ret = ret.concat(Vector.toList(now));

  direction = Vector.rotate(direction, -Math.PI / 2);
  const tailPoint2: vector = Vector.add(now, Vector.mulN(direction, weight / 2));
  now = Vector.add(now, Vector.mulN(direction, weight));
  ret = ret.concat(Vector.toList(now));
  return {
    tailPoints: [tailPoint1, tailPoint2],
    arrowPoints: ret,
  };
}

// @ts-ignore
const Arrow = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    item, index, click, isSelected,
  } = props;

  const [circleOpacity, setCircleOpacity] = useState(1);
  useEffect(() => {
    if (isSelected === true) setCircleOpacity(1);
    else setCircleOpacity(0);
  }, [isSelected]);
  // eslint-disable-next-line react/prop-types
  const { arrowPoints, tailPoints } = getArrow(item.start, item.end, item.weight, item.arrowSize);
  const [state, dispatch] = [useStateStore(), useDispatchStore()];
  const miniDistance = globalConfig.miniAbsorbDistance;
  const [lastDrag, setLastDrag] = useState(Date.now());
  return (
    <>
      <KonvaLine
        {...item}
        {...shapeConfig}
        // eslint-disable-next-line react/prop-types
        points={arrowPoints}
        closed
        draggable={false}
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
        x={item.start.x + item.x}
        // eslint-disable-next-line react/prop-types
        y={item.start.y + item.y}
        // eslint-disable-next-line react/prop-types
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
              dispatch({ type: 'setAdsorptionPointsList', payload: res.adsorptionPoints });
              flag = true;
            }
          });
          if (!flag) dispatch({ type: 'setAdsorptionPointsList', payload: [] });
          const afterE = Object.assign(doc.data.shapes[index], {
            start: {
              x: newPoint.x - doc.data.shapes[index].x + Math.random() * 0.000001,
              y: newPoint.y - doc.data.shapes[index].y + Math.random() * 0.000001,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        radius={globalConfig.auxiliaryPointSize / state.stageScale}
        fill="white"
        stroke={(1 / state.stageScale).toString()}
      />
      <Circle
        // eslint-disable-next-line react/prop-types
        x={item.end.x + item.x}
        // eslint-disable-next-line react/prop-types
        y={item.end.y + item.y}
        // eslint-disable-next-line react/prop-types
        opacity={circleOpacity}
        draggable
        onClick={click}
        onDragMove={(e: { target: { attrs: { x: any; y: any; }; }; }) => {
          if (Date.now() - lastDrag < globalConfig.absorbInterval) return;
          setLastDrag(Date.now());
          const mouse: vector = { x: e.target.attrs.x, y: e.target.attrs.y };
          let newPoint = mouse;
          let flag = false;
          doc.data.shapes.forEach((shape: BaseShapes.Shape, ind: number) => {
            if (flag || ind === index) return;
            const res = checkAdsorptionPoint(mouse, shape, miniDistance);
            if (res.flag === true) {
              newPoint = res.adsorptionVertex;
              dispatch({ type: 'setAdsorptionPointsList', payload: res.adsorptionPoints });
              flag = true;
            }
          });
          if (!flag) dispatch({ type: 'setAdsorptionPointsList', payload: [] });
          const afterE = Object.assign(doc.data.shapes[index], {
            end: {
              x: newPoint.x - doc.data.shapes[index].x + Math.random() * 0.000001,
              y: newPoint.y - doc.data.shapes[index].y + Math.random() * 0.000001,
            },
          });
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        radius={globalConfig.auxiliaryPointSize / state.stageScale}
        fill="white"
        stroke={(1 / state.stageScale).toString()}
      />
      {
        tailPoints.map((obj, ind) => (
          <Circle
            // eslint-disable-next-line react/prop-types
            x={obj.x + item.x}
            // eslint-disable-next-line react/prop-types
            y={obj.y + item.y}
            // eslint-disable-next-line react/prop-types
            opacity={circleOpacity}
            draggable
            onDragMove={(e: { target: { attrs: { x: any; y: any; }; }; }) => {
              if (Date.now() - lastDrag < globalConfig.absorbInterval) return;
              setLastDrag(Date.now());
              const position = {
                x: e.target.attrs.x,
                y: e.target.attrs.y,
              };
              // eslint-disable-next-line react/prop-types
              const center = { x: item.x, y: item.y };
              // eslint-disable-next-line react/prop-types
              const { start, end } = item;
              let direction = Vector.init(Vector.sub(end, start));
              if (ind === 0) direction = Vector.rotate(direction, (-Math.PI * 3) / 4);
              else direction = Vector.rotate(direction, (Math.PI * 3) / 4);
              // eslint-disable-next-line react/prop-types
              let newArrowSize = Math.max(Vector.mulV(direction, Vector.sub(position, Vector.add(center, end))), item.weight);
              // eslint-disable-next-line react/prop-types
              newArrowSize = (newArrowSize + item.arrowSize) / 2;
              const afterE = Object.assign(doc.data.shapes[index], {
                // make sure circle flush when over darg
                arrowSize: newArrowSize + Math.random() * 0.0001,
              });
              doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
            }}
            radius={globalConfig.auxiliaryPointSize / state.stageScale}
            fill="white"
            stroke={(1 / state.stageScale).toString()}
          />
        ))
      }
    </>
  );
};

export default Arrow;
