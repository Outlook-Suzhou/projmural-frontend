import React, { useEffect, useRef } from 'react';
import { Line, Transformer } from 'react-konva';
import doc from '../../client/client';
import shapeConfig from './shape_config';
import { useStateStore, useDispatchStore } from '../../store/store';

interface Props {
  item: BaseShapes.Triangle,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
}

const Triangle: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, onSelect, index, onDragStart, onDragEnd,
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
        {...shapeConfig}
        draggable={item.draggable && state.selectShape === 'FREE'}
        points={[item.radius.x, 0, 0, item.radius.y, -item.radius.x, 0]}
        key={index}
        closed
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragMove={(e) => {
          const afterE: BaseShapes.Triangle = {
            radius: e.target.attrs.radius,
            x: e.target.x(),
            y: e.target.y(),
            type: 'TRIANGLE',
            fill: item.fill,
            rotation: item.rotation,
            draggable: item.draggable,
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
          const afterE: BaseShapes.Triangle = {
            ...item,
            y: node.y(),
            x: node.x(),
            // set minimal value
            radius: {
              x: Math.max(5, node.points()[0] * scaleX),
              y: Math.max(5, node.points()[3] * scaleY),
            },
            type: 'TRIANGLE',
            rotation: node.rotation(),
            fill: item.fill,
            draggable: item.draggable,
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

export default Triangle;
