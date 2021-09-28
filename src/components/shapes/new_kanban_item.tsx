import {
  Rect, Text, Transformer,
} from 'react-konva';
import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import getCurrentDoc from '../../client/client';
import { useDispatchStore, useStateStore } from '../../store/store';
import colorDetect from '../../utils/colorDetect';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Kanban,
  isSelected: boolean,
  index: number,
  i: number,
  click: any,
  onTransformStart: any,
  onTransformEnd: any,
}
const NewKanbanItem: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, index, i, click, onTransformStart, onTransformEnd,
  } = props;
  const shapeRef = useRef<any>();
  const trRef = useRef<any>();
  const state = useStateStore();
  const dispatch = useDispatchStore();
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
        ref={shapeRef}
        x={item.projs[i].x}
        y={item.projs[i].y}
        draggable
        onDragStart={() => { item.draggable = false; }}
        onDragEnd={() => { item.draggable = true; }}
        onDragMove={(e) => {
          item.projs[i].x = e.target.x();
          item.projs[i].y = e.target.y();
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
        }}
        onClick={click}
        width={item.projs[i].width}
        height={item.projs[i].height}
        stroke={item.projs[i].color}
        shadowOpacity={0.3}
        shadowOffsetX={3}
        shadowOffsetY={3}
        shadowBlur={4}
        strokeWidth={0.7}
        fill={item.projs[i].color}
        onTransformStart={onTransformStart}
        onTransformEnd={onTransformEnd}
        onTransform={() => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          item.projs[i].width = Math.max(5, node.width() * scaleX);
          item.projs[i].x = node.x();
          item.projs[i].height = Math.max(5, node.height() * scaleY);
          item.projs[i].y = node.y();
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
        }}
      />
      <Text
        x={item.projs[i].x + 5}
        y={item.projs[i].y + 10}
        fontSize={9}
          // eslint-disable-next-line no-nested-ternary
        text={item.projs[i].status === 'blocked' ? '❓' : item.projs[i].status === 'finished' ? '✅' : item.projs[i].status === 'in progress' ? '⏳' : '📌'}
      />
      <Text
        x={item.projs[i].x + item.projs[i].width / 4}
        y={item.projs[i].y + 10}
        width={item.projs[i].width * 0.5}
        height={item.projs[i].height * 0.75}
        lineHeight={1.1}
        text={item.projs[i].text}
        fill={colorDetect(item.projs[i].color) === 'light' ? 'black' : 'white'}
        align="center"
        onClick={click}
        wrap="char"
        fontSize={9}
        visible={item.projs[i].visible}
        draggable
        onDragStart={() => { item.draggable = false; }}
        onDragEnd={() => { item.draggable = true; }}
        onDragMove={(e) => {
          item.projs[i].x = e.target.x() - item.projs[i].width / 4;
          item.projs[i].y = e.target.y() - 10;
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
        }}
        onDblClick={() => {
          const ops = state.OpList;
          ops.push(JSON.stringify(doc.value.data.shapes));
          dispatch({ type: 'setOpList', payload: ops });
          item.projs[i].visible = false;
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          const textNode = new Konva.Text({
            text: 'Some text here',
            x: 50,
            y: 80,
            fontSize: 20,
            draggable: true,
            width: 1000,
          });
          textarea.style.fontSize = `${7 * item.shift.scale}px`;
          textarea.style.position = 'absolute';
          textarea.value = item.projs[i].text;
          textarea.style.transformOrigin = 'left top';
          textarea.style.top = `${(item.y + item.projs[i].y + 10) * item.shift.scale + item.shift.y}px`;
          textarea.style.left = `${(item.x + item.projs[i].x + item.projs[i].width / 4) * item.shift.scale + item.shift.x}px`;
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.fontFamily = 'Arial';
          textarea.style.lineHeight = String(textNode.lineHeight());
          textarea.style.textAlign = 'center';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.transformOrigin = 'left top';
          textarea.style.color = `${colorDetect(item.projs[i].color) === 'light' ? 'black' : 'white'}`;
          textarea.style.height = `${(item.projs[i].height * 0.75) * item.shift.scale}px`;
          textarea.style.width = `${(item.projs[i].width * 0.5) * item.shift.scale + textNode.padding() * 2}px`;
          textarea.focus();
          textarea.addEventListener('keydown', () => {
            item.projs[i].text = textarea.value;
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
          });
          function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('click', handleOutsideClick);
            item.projs[i].visible = true;
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
          }
          function handleOutsideClick(e: { target: HTMLTextAreaElement; }) {
            if (e.target !== textarea) {
              item.projs[i].text = textarea.value;
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
          rotateEnabled={false}
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

export default NewKanbanItem;
