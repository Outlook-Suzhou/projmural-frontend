// eslint-disable-next-line no-unused-vars
import { Text } from 'react-konva';
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import doc from '../../client/client';

interface Props {
  item: BaseShapes.Text,
  index: number,
  click: any
}

const TEXT: React.FC<Props> = (props: Props) => {
  const {
    item, index, click,
  } = props;
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Text
        x={item.x}
        y={item.y}
        text={item.text}
        key={index}
        draggable
        onClick={click}
        visible={visible}
        onDblClick={() => {
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          textarea.style.position = 'absolute';
          textarea.value = item.text;
          setVisible(false);
          // @ts-ignore
          const stage = document.getElementById('stage').getBoundingClientRect();
          textarea.style.top = `${item.y + stage.top + 36}px`;
          textarea.style.left = `${item.x + stage.left + 40}px`;
          textarea.style.fontSize = `${item.fontSize}px`;
          textarea.style.width = '1000px';
          textarea.style.height = '1000px';
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.transformOrigin = 'left top';
          textarea.focus();
          textarea.addEventListener('keydown', () => {
            item.text = textarea.value;
            doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
          });
          function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('click', handleOutsideClick);
            doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
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
        fontSize={item.fontSize}
        fill={item.fill}
        onDragMove={(e) => {
          const afterE = {
            width: e.target.width(),
            height: e.target.height(),
            x: e.target.x(),
            y: e.target.y(),
            fontSize: item.fontSize,
            type: 'TEXT',
            text: item.text,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
      />
    </>
  );
};

export default TEXT;
