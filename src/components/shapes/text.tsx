// eslint-disable-next-line no-unused-vars
import { Text } from 'react-konva';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import 'antd/dist/antd.css';
import doc from '../../client/client';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const TEXT = ({
// @ts-ignore
  // eslint-disable-next-line react/prop-types
  item, index, click,
}) =>
  // @ts-ignore
// eslint-disable-next-line implicit-arrow-linebreak
  (
  // eslint-disable-next-line react/jsx-no-comment-textnodes
  // eslint-disable-next-line react/react-in-jsx-scope
    <>
      <Text
            // eslint-disable-next-line react/prop-types
        x={item.x}
            // eslint-disable-next-line react/prop-types
        y={item.y}
            // @ts-ignore
            // eslint-disable-next-line react/prop-types,no-unused-vars
        text={item.text}
        key={index}
        draggable
        onClick={click}
        onDblClick={() => {
          const textarea = document.createElement('textarea');
          document.body.appendChild(textarea);
          textarea.style.position = 'absolute';
          // eslint-disable-next-line react/prop-types
          textarea.value = item.text;
          // eslint-disable-next-line no-param-reassign,react/prop-types
          item.text = '';
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
          // @ts-ignore
          const stage = document.getElementById('stage').getBoundingClientRect();
          // eslint-disable-next-line react/prop-types
          textarea.style.top = `${item.y + stage.top + 36}px`;
          // eslint-disable-next-line react/prop-types
          textarea.style.left = `${item.x + stage.left + 40}px`;
          // eslint-disable-next-line react/prop-types
          textarea.style.fontSize = `${item.fontSize}px`;
          textarea.style.width = '1000px';
          textarea.style.border = 'none';
          textarea.style.padding = '0px';
          textarea.style.margin = '0px';
          textarea.style.overflow = 'hidden';
          textarea.style.background = 'none';
          textarea.style.outline = 'none';
          textarea.style.resize = 'none';
          textarea.style.transformOrigin = 'left top';
          textarea.focus();
          function removeTextarea() {
            // @ts-ignore
            textarea.parentNode.removeChild(textarea);
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            window.removeEventListener('click', handleOutsideClick);
            doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: item }]);
          }
          function handleOutsideClick(e: { target: HTMLTextAreaElement; }) {
            if (e.target !== textarea) {
              // eslint-disable-next-line no-param-reassign,react/prop-types
              item.text = textarea.value;
              removeTextarea();
            }
          }
          setTimeout(() => {
            // @ts-ignore
            window.addEventListener('click', handleOutsideClick);
          });
        }}
          // @ts-ignore
          // eslint-disable-next-line react/prop-types,no-unused-vars
        fontSize={item.fontSize}
        onDragMove={(e) => {
          const afterE = {
            width: e.target.width(),
            height: e.target.height(),
            x: e.target.x(),
            y: e.target.y(),
            // eslint-disable-next-line react/prop-types
            fontSize: item.fontSize,
            type: 'TEXT',
            // eslint-disable-next-line react/prop-types
            text: item.text,
          };
          doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
        }}
      />
    </>
  );
export default TEXT;
