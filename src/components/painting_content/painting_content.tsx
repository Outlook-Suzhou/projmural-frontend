/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import {
  Row, Col,
} from 'antd';
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
import DeleteAll from '../tool_bar/tools/delete_all';
import BaseShape from '../shapes/baseshape';
import SelectColor from '../tool_bar/tools/select_color';
import Lock from '../tool_bar/tools/lock';
import {
  useStateStore, useDispatchStore, StateContext, DispatchContext,
} from '../../store/store';
import DelEle from '../tool_bar/tools/del_ele';
import ZIndex from '../tool_bar/tools/zIndex_up';

const PaintingContent: React.FC<{}> = () => {
  const [list, setList] = useState(doc?.data?.shapes || []);
  const state = useStateStore();
  const dispatch = useDispatchStore();
  // console.log(dispatch);
  // const [selectedId, selectShape] = useState(-1);
  const checkDeselect = (e: { target: { getStage: () => any; }; }) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      dispatch({ type: 'setCurrentIndex', payload: -1 });
    }
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
      {state.currentIndex === -1 ? null : <ToolBar width={300} height={80} list={[SelectColor, ZIndex, Lock, DelEle]} isFloatBar />}
      <Row style={{ width: '100%' }}>
        <Col span={3}>
          <ToolBar width={80} height={400} list={[AddShape, AddImage, AddText, DeleteAll]} isFloatBar={false} />
        </Col>
        <Col id="stage" span={21} style={{ padding: '40px' }}>
          <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <StateContext.Provider value={state}>
              <DispatchContext.Provider value={dispatch}>
                <Layer>
                  {
                    list.map((item: any, index: number) => (
                      <BaseShape
                        item={item}
                        index={index}
                        click={() => { dispatch({ type: 'setCurrentItem', payload: item }); dispatch({ type: 'setCurrentIndex', payload: index }); console.log(state); }}
                      />
                    ))
                  }
                </Layer>
              </DispatchContext.Provider>
            </StateContext.Provider>
          </Stage>
        </Col>
      </Row>
    </>
  );
};
export default PaintingContent;
