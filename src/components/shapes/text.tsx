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
  item, index, click, ondblclick,
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
        onDblClick={ondblclick}
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
