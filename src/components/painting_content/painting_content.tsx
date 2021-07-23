/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import doc from '../../client/client';

const PaitingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  useEffect(() => {
    doc.subscribe(() => {
      if (doc?.data?.shapes) {
        setList([...doc.data.shapes]);
      }
    });
  }, []);
  useEffect(() => {
    doc.on('op', () => {
      if (doc?.data?.shapes) {
        setList([...doc.data.shapes]);
      }
    });
  }, []);
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {
          list.map((item: any, index: number) => (
            <Rect
              {...item}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              fill="blue"
              draggable
              onDragMove={(e) => {
                const afterE = {
                  width: e.target.width(),
                  height: e.target.height(),
                  x: e.target.x(),
                  y: e.target.y(),
                  type: 'RECTANGLE',
                };
                doc.submitOp([{ p: ['shapes', index], ld: doc.data.shapes[index], li: afterE }]);
              }}
            />
          ))
        }
      </Layer>
    </Stage>
  );
};
export default PaitingContent;
