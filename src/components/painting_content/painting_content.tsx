/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import {
  Row, Col,
} from 'antd';
import doc from '../../client/client';
import AddShape from '../tool_bar/tools/add_shape';
import ToolBar from '../tool_bar/tool_bar';
import AddImage from '../tool_bar/tools/add_images';
import AddText from '../tool_bar/tools/add_text';
import DeleteAll from '../tool_bar/tools/delete_all';
import BaseShape from '../shapes/baseshape';
import SelectColor from '../tool_bar/tools/select_color';
import Lock from '../tool_bar/tools/lock';
import { useStateStore, useDispatchStore } from '../../store/store';
import DelEle from '../tool_bar/tools/del_ele';
import ZIndex from '../tool_bar/tools/zIndex';
import FontSize from '../tool_bar/tools/font_size';
import FreeDrawing from '../tool_bar/tools/free_drawing';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [lastLine, setLastLine] = useState({
    fill: '#df4b26',
    globalCompositeOperation: 'source-over',
    points: [1, 2],
    type: 'CURVELINE',
  });
  const [isPainting, setIsPainting] = useState(false);

  // const [selectedId, selectShape] = useState(-1);
  const checkDeselect = (e: { target: { getStage: () => any; }; }) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({ type: 'setCurrentIndex', payload: -1 });
    }
    const pos = e.target.getStage().getPointerPosition();
    setLastLine({
      fill: '#df4b26',
      globalCompositeOperation: 'source-over',
      points: [pos.x, pos.y],
      type: 'CURVELINE',
    });
    doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: lastLine }]);
    setIsPainting(true);
  };
  const mouseMove = (e: { target: { getStage: () => any; }; }) => {
    if (isPainting) {
      const pos = e.target.getStage().getPointerPosition();
      // @ts-ignore
      const newPoints = lastLine.points.concat([pos.x, pos.y]);
      // @ts-ignore
      setLastLine({
        type: 'CURVELINE',
        fill: '#df4b26',
        globalCompositeOperation: 'source-over',
        points: newPoints,
      });
      doc.submitOp([{ p: ['shapes', doc.data.shapes.length - 1], li: lastLine }]);
    }
  };
  const getFloatBar = () => {
    const tools = [SelectColor, ZIndex, Lock, DelEle];
    if (state.currentItem.type === 'TEXT') {
      tools.push(FontSize);
    }
    return tools;
  };
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
      {state.currentIndex === -1 ? null : <ToolBar width={300} height={80} list={getFloatBar()} isFloatBar />}
      <Row style={{ width: '100%' }}>
        <Col span={3}>
          <ToolBar width={80} height={400} list={[AddShape, AddImage, AddText, DeleteAll, FreeDrawing]} isFloatBar={false} />
        </Col>
        <Col id="stage" span={21} style={{ padding: '40px' }}>
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            onMouseMove={mouseMove}
            onMouseUp={() => setIsPainting(false)}
          >
            <Layer>
              {
                list.map((item: any, index: number) => (
                  <BaseShape
                    item={item}
                    index={index}
                    currentItem={state.currentItem}
                    currentIndex={state.currentIndex}
                    click={() => { dispatch({ type: 'setCurrentItem', payload: item }); dispatch({ type: 'setCurrentIndex', payload: index }); console.log(state); }}
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
