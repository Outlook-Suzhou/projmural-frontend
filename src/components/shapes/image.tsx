import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import React, { useEffect, useRef } from 'react';
import shapeConfig from './shape_config';
import { useStateStore, useDispatchStore } from '../../store/store';

interface Props {
  item: BaseShapes.Image,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Img: React.FC<Props> = (props: Props) => {
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
  const [img] = useImage(item.url);
  return (
    <>
      <Image
        onClick={onSelect}
        onTap={onSelect}
        x={item.x}
        y={item.y}
        width={item.width}
        height={item.height}
        ref={shapeRef}
        {...shapeConfig}
        image={img}
        rotation={item.rotation}
        draggable={item.draggable && state.selectShape === 'FREE'}
        key={index}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onDragEnd();
          const afterE: BaseShapes.Image = {
            width: e.target.width(),
            height: e.target.height(),
            x: e.target.x(),
            y: e.target.y(),
            type: 'IMAGE',
            url: item.url,
            rotation: item.rotation,
            draggable: item.draggable,
          };
          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        }}
        // onDragMove={(e) => {
        //   const afterE: BaseShapes.Image = {
        //     width: e.target.width(),
        //     height: e.target.height(),
        //     x: e.target.x(),
        //     y: e.target.y(),
        //     type: 'IMAGE',
        //     url: item.url,
        //     rotation: item.rotation,
        //     draggable: item.draggable,
        //   };
        //   state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        // }}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
        onTransform={() => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we w  ill reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Image = {
            ...item,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
            type: 'IMAGE',
            url: item.url,
            rotation: node.rotation(),
            draggable: item.draggable,
          };

          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
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

export default Img;
