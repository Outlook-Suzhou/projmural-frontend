/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import {
  Row, Col,
} from 'antd';
import { Icon } from '@fluentui/react/lib/Icon';
import doc from '../../client/client';
// import Ellipse from '../shapes/ellipse';
// import Rectangle1 from '../shapes/transform_rect';
// import Diamond from '../shapes/diamond';
// import Circle from '../shapes/circle';
// import Line from '../shapes/line';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';
// import Img from '../shapes/image';
import AddImage from '../tool_bar/tools/add_images';
// import Triangle from '../shapes/triangle';
// import Text from '../shapes/text';
import AddText from '../tool_bar/tools/add_text';
import BaseShape from '../shapes/baseshape';
import SelectColor from '../tool_bar/tools/select_color';
import ZIndexUp from '../tool_bar/tools/zIndex_up';
import ZIndexDown from '../tool_bar/tools/zIndex_down';
import Lock from '../tool_bar/tools/lock';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const [currentItem, setCurrentItem] = useState({});
  const [currentIndex, setCurrentIndex] = useState(-1);

  // const [selectedId, selectShape] = useState(-1);
  const checkDeselect = (e: { target: { getStage: () => any; }; }) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setCurrentIndex(-1);
    }
  };
  const DelEle: React.FC<{}> = () => (
    <div className="tool_icon">
      <Icon
        iconName="Delete"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { doc.submitOp([{ p: ['shapes', currentIndex], ld: currentItem }]); }}
      />
    </div>
  );

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
      {currentIndex === -1 ? null : <ToolBar width={300} height={80} list={[SelectColor, ZIndexUp, ZIndexDown, Lock]} currentItem={currentItem} currentIndex={currentIndex} setCurrentItem={setCurrentItem} setCurrentIndex={setCurrentIndex} isFloatBar />}
      <Row style={{ width: '100%' }}>
        <Col span={3}>
          <ToolBar width={80} height={300} list={[AddShape, AddImage, AddText, DelEle]} currentItem={currentItem} currentIndex={currentIndex} setCurrentItem={setCurrentItem} setCurrentIndex={setCurrentIndex} isFloatBar={false} />
        </Col>
        <Col id="stage" span={21} style={{ padding: '40px' }}>
          <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <Layer>
              {
                list.map((item: any, index: number) => (
                  <BaseShape
                    item={item}
                    index={index}
                    currentItem={currentItem}
                    currentIndex={currentIndex}
                    click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }}
                  />
                ))
              }
            </Layer>
          </Stage>
        </Col>
      </Row>
    </>
  );
};
export default PaintingContent;
