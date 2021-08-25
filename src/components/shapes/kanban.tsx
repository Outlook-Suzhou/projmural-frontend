import { Rect, Group, Text } from 'react-konva';
import React from 'react';
import Konva from 'konva';
import doc from '../../client/client';
import { useStateStore } from '../../store/store';

interface Props {
  item: BaseShapes.Kanban,
  onSelect: any,
  index: number,
  onDragStart: any,
  onDragEnd: any,
  onTransformStart: any,
  onTransformEnd: any
}
const Kanban : React.FC<Props> = (props: Props) => {
  const {
    item, index, onSelect, onDragStart, onDragEnd, onTransformStart, onTransformEnd,
  } = props;
  const color = ['#FFC500', '#3F53D9', '#FFBFBF', '#ff653b', '#1e9575'];
  const state = useStateStore();
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
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }
      }}
    >
      {[...Array(item.teamNum)].map((_, i) => (
        <Group>
          <Group>
            <Rect
              x={10}
              y={10 + i * 60}
              width={140}
              height={60}
              fill={color[i % 5]}
              stroke="#E6E6E6"
              strokeWidth={0.5}
            />
            <Text
              x={item.teams[i].x}
              y={item.teams[i].y}
              text={item.teams[i].text}
              key={index}
              fontSize={item.teams[i].fontSize}
              width={item.teams[i].width}
              fill={item.teams[i].fill}
              visible={item.teams[i].visible}
              onDblClick={() => {
                item.teams[i].visible = false;
                doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
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
                textarea.style.top = `${(item.y + 20 + i * 60) * item.shift.scale + item.shift.y}px`;
                textarea.style.left = `${(item.x + 20) * item.shift.scale + item.shift.x}px`;
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
                  doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
                });
                function removeTextarea() {
                  // @ts-ignore
                  textarea.parentNode.removeChild(textarea);
                  // @ts-ignore
                  // eslint-disable-next-line @typescript-eslint/no-use-before-define
                  window.removeEventListener('click', handleOutsideClick);
                  item.teams[i].visible = true;
                  doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
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
            {[...Array(item.dateNum)].map((__, j) => (
              <Rect
                x={(j * 900) / item.dateNum + 150}
                y={i * 60 + 10}
                width={900 / item.dateNum}
                height={60}
                fill="white"
                stroke="#E6E6E6"
                strokeWidth={0.5}
              />
            ))}
          </Group>
        </Group>

      ))}
      {[...Array(item.dateNum)].map((_, i) => (
        <Text
          x={(i * 900) / item.dateNum + 150 + 450 / item.dateNum}
          y={-20}
          text={`${i + 1}`}
          fontSize={9}
        />

      ))}
      {[...Array(item.projs.length)].map((_, i) => (
        <Group>
          <Text
            text={item.projs[i].text}
            x={item.projs[i].x}
            y={item.projs[i].y}
            fill="#ffffff"
            wrap="char"
            align="center"
            draggable
            onDragStart={() => { item.draggable = false; }}
            onDragEnd={() => { item.draggable = true; }}
            onDragMove={(e) => {
              item.projs[i].x = e.target.x();
              item.projs[i].y = e.target.y();
              doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
            }}
          />
        </Group>
      ))}
    </Group>
  );
};

export default Kanban;