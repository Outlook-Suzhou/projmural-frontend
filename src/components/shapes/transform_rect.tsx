import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';
import { useDispatchStore, useStateStore } from '../../store/store';

interface Props {
  item: BaseShapes.Rectangle,
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
    item, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
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
        onDragEnd={onDragEnd}
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
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
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
    </>
  );
};

export default Rectangle1;
