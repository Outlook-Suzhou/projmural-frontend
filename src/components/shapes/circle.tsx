import { Circle as KonvaCircle, Transformer } from 'react-konva';
import React, { useEffect, useRef } from 'react';
import doc from '../../client/client';
import shapeConfig from './shape_config';

interface Props {
  item: BaseShapes.Circle,
  isSelected: boolean,
  onSelect: any,
  index: number,
}
const Circle: React.FC<Props> = (props: Props) => {
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
  return (
    <>
      <KonvaCircle
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        {...shapeConfig}
        key={index}
        draggable
        onDragMove={(e) => {
          const afterE: BaseShapes.Circle = {
            radius: e.target.attrs.radius,
            x: e.target.x(),
            y: e.target.y(),
            type: 'CIRCLE',
            fill: item.fill,
            rotation: item.rotation,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Circle = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            radius: Math.max(5, scaleX !== 1 ? node.radius() * scaleX : node.radius() * scaleY),
            type: 'CIRCLE',
            rotation: node.rotation(),
            fill: item.fill,
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

export default Circle;
