import { Star as KonvaStar, Transformer } from 'react-konva';
import React, { useEffect, useRef } from 'react';
import getCurrentDoc from '../../client/client';
import shapeConfig from './shape_config';
import { useStateStore, useDispatchStore } from '../../store/store';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Star,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Star: React.FC<Props> = (props: Props) => {
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
      <KonvaStar
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        {...shapeConfig}
        key={index}
        numPoints={5}
        draggable={item.draggable && (state.selectShape === 'FREE')}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragMove={(e) => {
          const afterE: BaseShapes.Star = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const scale = Math.min(scaleX, scaleY);
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Star = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            innerRadius: node.innerRadius() * scale,
            outerRadius: node.outerRadius() * scale,
            type: 'STAR',
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
export default Star;
