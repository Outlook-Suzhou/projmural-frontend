// eslint-disable-next-line no-unused-vars
import { Image } from 'react-konva';
import useImage from 'use-image';
import React from 'react';
import doc from '../../client/client';

// @ts-ignore
// eslint-disable-next-line react/prop-types
const Img = ({ item, index, click }) => {
  // eslint-disable-next-line react/prop-types
  const [img] = useImage(item.url);
  return (
  // eslint-disable-next-line react/react-in-jsx-scope
    <Image
            // eslint-disable-next-line react/prop-types
      x={item.x}
            // eslint-disable-next-line react/prop-types
      y={item.y}
            // @ts-ignore
            // eslint-disable-next-line react/prop-types,no-unused-vars
      image={img}
      key={index}
      draggable
      onClick={click}
      onDragMove={(e) => {
        const afterE = {
          width: e.target.width(),
          height: e.target.height(),
          x: e.target.x(),
          y: e.target.y(),
          type: 'IMAGE',
          // eslint-disable-next-line react/prop-types
          url: item.url,
        };
        doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
      }}
    />
  );
};

export default Img;
