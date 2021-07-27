/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import doc from '../../client/client';
import Ellipse from '../shapes/ellipse';
import Rectangle from '../shapes/rectangle';
import Diamond from '../shapes/diamond';
import Circle from '../shapes/circle';
import Line from '../shapes/line';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';
import Img from '../shapes/image';
import AddImage from '../tool_bar/tools/add_images';

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
    <div>
      <div>
        <ToolBar width={80} height={200} list={[AddShape, AddImage]} currentShape={currentItem} currentIndex={currentIndex} />
      </div>
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
                case 'CIRCLE':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Circle item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
                case 'ELLIPSE':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Ellipse item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
                case 'DIAMOND':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Diamond item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
                case 'LINE':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Line item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
                case 'IMAGE':
                  // eslint-disable-next-line consistent-return
                  return (
                    <Img item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                  );
              }
            })
          }
        </Layer>
      </Stage>
    </div>
  );
};
export default PaitingContent;
