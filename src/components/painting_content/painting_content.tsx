/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import doc from '../../client/client';
import Rectangle from '../shapes/rectangle';

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
          list.map((item: any, index: number) => {
            switch (item.type) {
              default:
                return;
              case 'RECTANGLE':
                // eslint-disable-next-line consistent-return
                return <Rectangle item={item} index={index} />;
            }
          })
        }
      </Layer>
    </Stage>
  );
};
export default PaitingContent;
