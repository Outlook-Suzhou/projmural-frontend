import React, { useEffect, useRef, useState } from 'react';
import {
  Transformer, Text, Shape,
} from 'react-konva';
import getCurrentDoc from '../../client/client';
import shapeConfig from './shape_config';
import { useDispatchStore, useStateStore } from '../../store/store';
import colorDetect from '../../utils/colorDetect';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Message,
  isSelected: boolean,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Message: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
  } = props;

  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const [state] = [useStateStore(), useDispatchStore()];
  const [visible, setVisible] = useState(true);
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
      <Shape
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...item}
        {...shapeConfig}
        draggable={item.draggable && state.selectShape === 'FREE'}
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(0, 0);
          context.lineTo(item.width, 0);
          context.lineTo(item.width, item.height);
          context.lineTo(item.width * 0.4, item.height);
          context.lineTo(item.width * 0.2, item.height * 1.1);
          context.lineTo(item.width * 0.2, item.height);
          context.lineTo(0, item.height);
          context.closePath();
          // (!) Konva specific method, it is very important
          context.fillStrokeShape(shape);
        }}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onDragEnd();
          const afterE: BaseShapes.Message = {
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

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          const afterE: BaseShapes.Message = {
            ...item,
            x: node.x(),
            y: node.y(),
            fontSize: Math.min(item.width * 0.1, Math.max(item.width * 0.07, item.fontSize * Math.min(scaleX, scaleY))),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            type: 'MESSAGE',
            rotation: node.rotation(),
          };

          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }}
      />
      <Text
        x={item.x + item.width / 4}
        y={item.y + item.height / 4}
        width={item.width / 2}
        height={item.height / 2}
        text={item.text}
        fontSize={item.fontSize}
        fontFamily="Arial"
        fill={colorDetect(item.fill) === 'light' ? 'black' : 'white'}
        onClick={onSelect}
        visible={visible}
        align="center"
        draggable={item.draggable && state.selectShape === 'FREE'}
        onDragStart={onDragStart}
        onDragEnd={(e) => {
          onDragEnd();
          const afterE: BaseShapes.Message = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }}
        // onDragMove={(e) => {
        //   const afterE: BaseShapes.Message = {
        //     ...item,
        //     x: e.target.x(),
        //     y: e.target.y(),
        //   };
        //   doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        // }}
        onDblClick={() => {
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          textarea.style.fontSize = `${item.fontSize * state.stageScale}px`;
          textarea.style.position = 'absolute';
          textarea.value = item.text;
          setVisible(false);
          textarea.style.transformOrigin = 'left top';
          textarea.style.top = `${item.y * state.stageScale + state.stagePos.y}px`;
          textarea.style.left = `${item.x * state.stageScale + state.stagePos.x}px`;
          textarea.style.border = '0px';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.fontFamily = 'Arial';
          textarea.style.textAlign = 'center';
          // textarea.style.lineHeight = String(item.height / 4);
          textarea.style.resize = 'none';
          textarea.style.transformOrigin = 'left top';
          textarea.style.color = `${colorDetect(item.fill) === 'light' ? 'black' : 'white'}`;
          textarea.style.height = `${item.height * state.stageScale}px`;
          textarea.style.width = `${item.width * state.stageScale}px`;
          textarea.focus();
          textarea.addEventListener('keydown', () => {
            item.text = textarea.value;
            const node = shapeRef.current;
            item.height = node.height();
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
          });
          function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('click', handleOutsideClick);
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
            setVisible(true);
          }
          function handleOutsideClick(e: { target: HTMLTextAreaElement; }) {
            if (e.target !== textarea) {
              item.text = textarea.value;
              removeTextarea();
            }
          }
          setTimeout(() => {
            // @ts-ignore
            window.addEventListener('click', handleOutsideClick);
          });
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
            return { ...newBox };
          }}
          rotateEnabled={false}
          borderStroke="black"
          anchorStroke="black"
          anchorCornerRadius={5}
        />
      )}
    </>
  );
};

export default Message;
