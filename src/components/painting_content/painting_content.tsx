/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import doc from '../../client/client';
import Rectangle from '../shapes/rectangle';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';

const PaitingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const [currentItem, setCurrentItem] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);
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
    <>
      <ToolBar width={800} height={200} list={[{ Component: AddShape, currentShape: currentItem, currentIndex }]} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {
            list.map((item: any, index: number) => {
              switch (item.type) {
                default:
                  return;
                case 'RECTANGLE':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Rectangle item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
              }
            })
          }
        </Layer>
      </Stage>
    </>
  );
};
export default PaitingContent;
