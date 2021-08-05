import React, { useEffect, useRef } from 'react';
import { Rect, Transformer, Circle } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';
import { useStateStore } from '../../store/store';

interface Point {
  x: number,
  y: number,
}

function getVertex(center: Point, width: number, height: number, degree: number): Array<Point> {
  const realDegree = (degree * 2 * Math.PI) / 360;
  const rotate = (vector: Point, deg: number): Point => ({
    x: vector.x * Math.cos(deg) - vector.y * Math.sin(deg),
    y: vector.x * Math.sin(deg) + vector.y * Math.cos(deg),
  });
  const add = (a: Point, b: Point): Point => ({
    x: a.x + b.x,
    y: a.y + b.y,
  });
  let ret = [
    { x: width / 2, y: 0 },
    { x: width / 2, y: height },
    { x: 0, y: height / 2 },
    { x: width, y: height / 2 },
  ];
  ret = ret.map((item: Point) => (rotate(item, realDegree)));
  ret = ret.map((item: Point) => (add(item, center)));
  return ret;
}
interface Props {
  item: BaseShapes.Rectangle,
  isSelected: boolean,
  onSelect: any,
  index: number,
}
const Rectangle1: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, onSelect, index,
  } = props;

  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  useEffect(() => {
    // we need to attach transformer manually
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const vectexs = getVertex(
    { x: item.x, y: item.y },
    item.width, item.height, item.rotation,
  );

  const [globalState] = [useStateStore()];
  useEffect(() => {
    console.log(globalState.currentItem);
  }, globalState.currentItem);

  return (
    <>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
          // eslint-disable-next-line react/jsx-props-no-spreading
        {...shapeConfig}
        onDragMove={(e) => {
          const afterE: BaseShapes.Rectangle = {
            width: e.target.width(),
            height: e.target.height(),
            x: e.target.x(),
            y: e.target.y(),
            draggable: true,
            type: 'RECTANGLE',
            rotation: item.rotation,
            fill: item.fill,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        onTransform={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Rectangle = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            type: 'RECTANGLE',
            rotation: node.rotation(),
          };

          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox: any, newBox: { width: number; height: number; }) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
      {
        vectexs.map((obj: Point) => (
          <Circle
            x={obj.x}
            y={obj.y}
            radius={4}
            fill="red"
          />
        ))
      }
    </>
  );
};

export default Rectangle1;
