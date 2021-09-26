import { Rect, Group, Text } from 'react-konva';
import React from 'react';
import Konva from 'konva';
import getCurrentDoc from '../../client/client';
import { useDispatchStore, useStateStore } from '../../store/store';
import NewKanbanItem from './new_kanban_item';

const doc = getCurrentDoc();
interface Props {
  item: BaseShapes.Kanban,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any,
  isSelected: boolean,

}
const rectWidth = 300;
const rectHeight = 30;

const NewKanban : React.FC<Props> = (props: Props) => {
  const {
    item, index, onSelect, onDragStart, onDragEnd, onTransformStart, onTransformEnd, isSelected,
  } = props;
  const color = ['#FFC500', '#3F53D9', '#FFBFBF', '#ff653b', '#1e9575'];
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <Group
      x={item.x}
      y={item.y}
      key={index}
      draggable={item.draggable && state.selectShape === 'FREE'}
      onClick={onSelect}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onTransformStart={onTransformStart}
      onTransformEnd={onTransformEnd}
      onDragMove={(e) => {
        if (item.draggable) {
          const afterE = {
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          };
          doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: afterE }]);
        }
      }}
    >
      {[...Array(item.teamNum)].map((_, i) => (
        <Group>
          <Group>
            <Rect
              x={10 + i * rectWidth}
              y={10}
              width={rectWidth}
              height={rectHeight}
              fill={color[i % 5]}
              stroke="#E6E6E6"
              strokeWidth={0.5}
              onClick={() => { item.selectProj = -1; doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]); }}
            />
            <Text
              x={10 + i * rectWidth + rectWidth * 0.35}
              y={15}
              text={item.teams[i].text}
              key={index}
              fontSize={item.teams[i].fontSize}
              width={item.teams[i].width}
              fill={item.teams[i].fill}
              visible={item.teams[i].visible}
              onDblClick={() => {
                const ops = state.OpList;
                ops.push(JSON.stringify(doc.value.data.shapes));
                dispatch({ type: 'setOpList', payload: ops });
                item.teams[i].visible = false;
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
                textarea.style.fontSize = `${item.teams[i].fontSize * item.shift.scale}px`;
                textarea.style.position = 'absolute';
                textarea.value = item.teams[i].text;
                textarea.style.transformOrigin = 'left top';
                textarea.style.top = `${(item.y + 10) * item.shift.scale + item.shift.y}px`;
                textarea.style.left = `${(item.x + rectWidth / 3 + i * rectWidth) * item.shift.scale + item.shift.x}px`;
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
                textarea.style.color = item.teams[i].fill;
                textarea.style.height = '80px';
                textarea.style.width = `${item.teams[i].width * item.shift.scale + textNode.padding() * 2}px`;
                textarea.focus();
                textarea.addEventListener('keydown', () => {
                  item.teams[i].text = textarea.value;
                  doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
                });
                function removeTextarea() {
                  // @ts-ignore
                  textarea.parentNode.removeChild(textarea);
                  // @ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  window.removeEventListener('click', handleOutsideClick);
                  item.teams[i].visible = true;
                  doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
                }
                function handleOutsideClick(e: { target: HTMLTextAreaElement; }) {
                  if (e.target !== textarea) {
                    item.teams[i].text = textarea.value;
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
          <Group>
            {[...Array(item.days.length)].map((__, j) => (
              <Rect
                y={j * rectHeight + rectHeight}
                x={i * rectWidth + 10}
                width={Math.max(rectWidth, 900 / item.days.length)}
                height={rectHeight}
                fill="white"
                stroke="#E6E6E6"
                strokeWidth={0.5}
                onClick={() => { item.selectProj = -1; doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]); }}
              />
            ))}
          </Group>
        </Group>

      ))}
      {[...Array(item.days.length)].map((_, i) => (
        <Text
          y={i * rectHeight + rectHeight * 1.3}
          x={-50}
          text={item.days[i]}
          fontSize={9}
        />

      ))}
      {[...Array(item.projs.length)].map((_, i) => (
        <NewKanbanItem
          index={index}
          item={item}
          isSelected={isSelected && item.selectProj === i}
          i={i}
          click={() => {
            item.selectProj = i;
            doc.value.submitOp([{ p: ['shapes', index], ld: doc.value.data.shapes[index], li: item }]);
          }}
          onTransformStart={onTransformStart}
          onTransformEnd={onTransformEnd}
        />
      ))}
    </Group>
  );
};

export default NewKanban;
