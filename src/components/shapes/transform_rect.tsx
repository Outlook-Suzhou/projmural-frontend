import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import getCurrentDoc from '../../client/client';
import shapeConfig from './shape_config';
import { useDispatchStore, useStateStore } from '../../store/store';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Rectangle,
  gridWidth: number,
  gridHeight: number,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Rectangle1: React.FC<Props> = (props: Props) => {
  const {
    item, gridWidth, gridHeight, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
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
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        draggable={item.draggable && state.selectShape === 'FREE'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...shapeConfig}
        onDragStart={onDragStart}
        onDragEnd={() => {
          onDragEnd();
          const node = shapeRef.current;
          const x = node.x();
          const y = node.y();
          node.x(item.x);
          node.y(item.y);
          const afterE: BaseShapes.Rectangle = {
            ...item,
            x: Math.round(x / gridWidth) * gridWidth,
            y: Math.round(y / gridHeight) * gridHeight,
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }}
        // onDragMove={(e) => {
        //   const afterE: BaseShapes.Rectangle = {
        //     width: e.target.width(),
        //     height: e.target.height(),
        //     x: e.target.x(),
        //     y: e.target.y(),
        //     draggable: true,
        //     type: 'RECTANGLE',
        //     rotation: item.rotation,
        //     fill: item.fill,
        //   };
        //   doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        // }}
        onTransformStart={onTransformStart}
        onTransformEnd={
          () => {
            onTransformEnd();
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            const width = node.width() * scaleX;
            const height = node.height() * scaleY;
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            const x = Math.round(node.x() / gridWidth) * gridWidth;
            const y = Math.round(node.y() / gridHeight) * gridHeight;
            node.x(x);
            node.y(y);
            const afterE: BaseShapes.Rectangle = {
              ...item,
              x,
              y,
              // set minimal value
              width: Math.max(5, Math.round(width / gridWidth) * gridWidth),
              height: Math.max(5, Math.round(height / gridHeight) * gridHeight),
            };
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
          }
        }
      // onTransform={}
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

export default Rectangle1;
