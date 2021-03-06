import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  Rect, Transformer, Text, Group,
} from 'react-konva';
import { useDispatchStore, useStateStore } from '../../store/store';
import colorDetect from '../../utils/colorDetect';
import shapeConfig from './shape_config';

interface Props {
  item: BaseShapes.TextRect,
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
const TextRect: React.FC<Props> = (props: Props) => {
  const {
    item, gridWidth, gridHeight, isSelected, onSelect, index, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
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
      <Group
        // draggable={item.draggable && state.selectShape === 'FREE'}
        // eslint-disable-next-line react/jsx-props-no-spreading
        onDragStart={onDragStart}
        onDragEnd={() => {
          const node = shapeRef.current;
          const x = node.x();
          const y = node.y();
          node.x(item.x);
          node.y(item.y);
          const afterE: BaseShapes.TextRect = {
            ...item,
            x: Math.round(x / gridWidth) * gridWidth,
            y: Math.round(y / gridHeight) * gridHeight,
          };
          onDragEnd();
          state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
        }}
      >
        <Rect
          onClick={onSelect}
          onTap={onSelect}
          ref={shapeRef}
          {...item}
          {...shapeConfig}
          draggable={item.draggable && state.selectShape === 'FREE'}
          onTransformStart={onTransformStart}
          onTransformEnd={
            () => {
              onTransformEnd();
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
              const afterE: BaseShapes.TextRect = {
                ...item,
                x,
                y,
                // fontSize: Math.min(item.width * 0.1, Math.max(item.width * 0.07, item.fontSize * Math.min(scaleX, scaleY))),
                fontSize: item.fontSize,
                // set minimal value
                width: Math.max(5, Math.round(width / gridWidth) * gridWidth),
                height: Math.max(5, Math.round(height / gridHeight) * gridHeight),
              };
              state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: afterE }]);
            }
          }
        />
        <Text
          x={item.x + item.width / 8}
          y={item.y + item.height / 8}
          text={item.text}
          fontSize={item.fontSize}
          onClick={onSelect}
          onTap={onSelect}
          lineHeight={1.1}
          fontFamily="Arial"
          fill={colorDetect(item.fill) === 'light' ? 'black' : 'white'}
          visible={visible}
          align="center"
          // draggable={item.draggable && state.selectShape === 'FREE'}
          width={item.width * 0.75}
          height={item.height * 0.75}
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
              state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: item }]);
            });
            function removeTextarea() {
              // @ts-ignore
              textarea.parentNode.removeChild(textarea);
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              window.removeEventListener('click', handleOutsideClick);
              state.currentDoc.value.submitOp([{ p: ['shapes', index], ld: state.currentDoc.value.data.shapes[index], li: item }]);
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
      </Group>
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
          rotateEnabled={false}
          borderStroke="black"
          anchorStroke="black"
          anchorCornerRadius={5}
        />
      )}
    </>
  );
};

export default TextRect;
