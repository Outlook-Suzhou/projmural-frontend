import {
  Group, Rect, Text, Transformer,
} from 'react-konva';
import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import getCurrentDoc from '../../client/client';
import { useDispatchStore, useStateStore } from '../../store/store';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Kanban,
  isSelected: boolean,
  index: number,
  i: number,
  click: any,
  onTransformStart: any,
}
const KanbanItem: React.FC<Props> = (props: Props) => {
  const {
    item, isSelected, index, i, click, onTransformStart,
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
      <Group
        ref={shapeRef}
        x={item.projs[i].x}
        y={item.projs[i].y}
        width={item.projs[i].width}
        draggable
        onDragStart={() => { item.draggable = false; }}
        onDragEnd={() => { item.draggable = true; }}
        onDragMove={(e) => {
          item.projs[i].x = e.target.x();
          item.projs[i].y = e.target.y();
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
        }}
        onTransform={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          item.projs[i].width = Math.max(5, node.width() * scaleX);
          item.projs[i].x = e.target.x();
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
        }}
        onClick={click}
      >
        <Rect
          width={item.projs[i].width}
          height={20}
          stroke={item.projs[i].color}
          strokeWidth={0.7}
          fill="#ffffff"
          onTransformStart={onTransformStart}
        />
        <Rect
          width={2}
          height={20}
          fill={item.projs[i].color}
        />
        <Text
          x={5}
          y={5}
          width={20}
          // eslint-disable-next-line no-nested-ternary
          text={item.projs[i].status === 'blocked' ? '❓' : item.projs[i].status === 'finished' ? '✅' : item.projs[i].status === 'in progress' ? '⏳' : '📌'}
        />
        <Text
          x={28}
          y={7}
          width={item.projs[i].width - 28}
          text={item.projs[i].text}
          wrap="char"
          fontSize={7}
          visible={item.projs[i].visible}
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
            textarea.style.top = `${(item.y + item.projs[i].y + 7) * item.shift.scale + item.shift.y}px`;
            textarea.style.left = `${(item.x + item.projs[i].x + 28) * item.shift.scale + item.shift.x}px`;
            textarea.style.border = 'none';
            textarea.style.padding = '0px';
            textarea.style.margin = '0px';
            textarea.style.overflow = 'hidden';
            textarea.style.background = 'none';
            textarea.style.fontFamily = 'Arial';
            textarea.style.lineHeight = String(textNode.lineHeight());
            textarea.style.textAlign = textNode.align();
            textarea.style.outline = 'none';
            textarea.style.resize = 'none';
            textarea.style.transformOrigin = 'left top';
            textarea.style.height = '80px';
            textarea.style.width = `${(item.projs[i].width - 28) * item.shift.scale + textNode.padding() * 2}px`;
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
      </Group>
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
      {isSelected && (
        <Rect width={10} height={10} />
      )}
    </>
  );
};
export default KanbanItem;
