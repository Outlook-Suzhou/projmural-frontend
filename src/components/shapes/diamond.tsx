import { Line, Transformer } from 'react-konva';
import React, { useEffect, useRef } from 'react';
import getCurrentDoc from '../../client/client';
import shapeConfig from './shape_config';
// eslint-disable-next-line import/namespace
import { useStateStore, useDispatchStore } from '../../store/store';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Diamond,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Diamond: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformEnd, onTransformStart,
  } = props;
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [state] = [useStateStore(), useDispatchStore()];
  useEffect(() => {
    // we need to attach transformer manually
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);
  return (
    <>
      <Line
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        points={[0, item.radius.y, item.radius.x, 0, 0, -item.radius.y, -item.radius.x, 0]}
        closed
        {...shapeConfig}
        key={index}
        draggable={item.draggable && state.selectShape === 'FREE'}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onDragEnd();
          const afterE: BaseShapes.Diamond = {
            radius: e.target.attrs.radius,
            x: e.target.x(),
            y: e.target.y(),
            type: 'DIAMOND',
            fill: item.fill,
            rotation: item.rotation,
            draggable: item.draggable,
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }}
        // onDragMove={(e) => {
          // const afterE: BaseShapes.Diamond = {
          //   radius: e.target.attrs.radius,
          //   x: e.target.x(),
          //   y: e.target.y(),
          //   type: 'DIAMOND',
          //   fill: item.fill,
          //   rotation: item.rotation,
          //   draggable: item.draggable,
          // };
          // doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        // }}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Diamond = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            radius: {
              x: Math.max(5, node.points()[2] * scaleX),
              y: Math.max(5, node.points()[1] * scaleY),
            },
            type: 'DIAMOND',
            rotation: node.rotation(),
            fill: item.fill,
            draggable: item.draggable,
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
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
          borderStroke="black"
          anchorStroke="black"
          anchorCornerRadius={5}
        />
      )}
    </>
  );
};
export default Diamond;
