/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import {
  Row, Col, Modal, Input, InputNumber,
} from 'antd';

import { FontSizeOutlined } from '@ant-design/icons';
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
import Triangle from '../shapes/triangle';
import Text from '../shapes/text';
import AddText from '../tool_bar/tools/add_text';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const [currentItem, setCurrentItem] = useState({
    text: '', fontSize: 10,

  });
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(10);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    currentItem.text = text;
    currentItem.fontSize = fontSize;
    console.log(fontSize);
    setIsModalVisible(false);
    doc.submitOp([{ p: ['shapes', currentIndex], ld: doc.data.shapes[currentIndex], li: currentItem }]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChange(value: any) {
    setFontSize(value);
  }

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
  // @ts-ignore
  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={3}>
          <ToolBar width={80} height={200} list={[AddShape, AddImage, AddText]} currentShape={currentItem} currentIndex={currentIndex} />
        </Col>
        <Col span={21} style={{ padding: '40px' }}>
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
                        <Rectangle item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(doc); }} />
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
                    case 'IMAGE':
                      // eslint-disable-next-line consistent-return
                      return (
                        <Img item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                      );
                    case 'TRIANGLE':
                      // eslint-disable-next-line consistent-return
                      return (
                        <Triangle item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                      );
                    case 'LINE':
                      // eslint-disable-next-line consistent-return
                      return (
                        <Line item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} />
                      );
                    case 'TEXT':
                      // eslint-disable-next-line consistent-return
                      return (
                        <Text item={item} index={index} click={() => { setCurrentItem(item); setCurrentIndex(index); console.log(item); }} ondblclick={() => { setText(item.text); setFontSize(item.fontSize); setCurrentItem(item); setCurrentIndex(index); console.log(item); showModal(); }} />
                      );
                  }
                })
              }
            </Layer>
          </Stage>
        </Col>
      </Row>
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <br />
        <FontSizeOutlined />
        <InputNumber style={{ marginInlineStart: '10' }} min={5} max={40} defaultValue={fontSize} onChange={onChange} />
        <br />
        <br />
        <Input type="text" defaultValue={text} onChange={(e) => setText(e.target.value)} />
      </Modal>
    </>
  );
};
export default PaintingContent;
