import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
import React, { useEffect } from 'react';
import {
  Col, Divider, InputNumber, Popover, Row, Slider, Tooltip,
} from 'antd';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useDispatchStore, useStateStore } from '../../../store/store';
import { calcX, calcY } from '../../../utils/calc_zoom_position';
import doc from '../../../client/client';

const gridStyle: any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
let penColor = '#000000';
let penSize = 4;
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'blue' }],
  common: [{ color: 'unset' }],
  myColor: [{ color: penColor }],
});
const chooseColor: React.FC<{}> = () => {
  const handlePickComplete = (color: any) => {
    penColor = color.hex;
  };
  const onChange = (value: number) => {
    penSize = value;
  };
  return (
    <>
      <Row>
        <Col span={15}>
          <Slider
            min={1}
            max={7}
            onChange={onChange}
            value={typeof penSize === 'number' ? penSize : 1}
          />
        </Col>
        <Col span={2}>
          <InputNumber
            min={1}
            max={7}
            style={{ margin: '0 16px' }}
            value={penSize}
            onChange={onChange}
          />
        </Col>
      </Row>
      <br />
      <TwitterPicker onChangeComplete={handlePickComplete} />
    </>
  );
};
const Content: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  const state = useStateStore();
  return (
    <>
      <Col
        span={8}
        role="button"
        tabIndex={0}
        onClick={() => {
          dispatch({ type: 'setSelectShape', payload: 'PEN' });
        }}
        style={gridStyle}
      >
        <Tooltip title="画笔">
          <Icon
            iconName="edit"
            className={state.selectShape === 'PEN' ? classNames.deepSkyBlue : classNames.common}
          />
        </Tooltip>
      </Col>
      <Col
        span={10}
        className="chooseShapeButton"
        role="button"
        tabIndex={-1}
        onClick={() => {
          dispatch({ type: 'setSelectShape', payload: 'ERASER' });
        }}
        style={gridStyle}
      >
        <Tooltip title="橡皮">
          <Icon
            iconName="WipePhone"
          />
        </Tooltip>
      </Col>
      <div id="penColor" style={{ display: state.selectShape === 'PEN' ? '' : 'none' }}>
        <Col>
          <Divider />
        </Col>
        <Popover trigger="click" placement="right" content={chooseColor}>
          <Col
            span={10}
            className="chooseShapeButton"
            role="button"
            tabIndex={-1}
            style={gridStyle}
          >
            <Tooltip title="画笔设置">
              <Icon
                iconName="locationdot"
                style={{ color: penColor, fontSize: `${4 * penSize}px` }}
              />
            </Tooltip>
          </Col>
        </Popover>
      </div>
    </>
  );
};
const FreeDrawing: React.FC<{}> = () => (
  <div className="tool_icon">
    <Popover trigger="click" placement="rightBottom" content={Content}>
      <Tooltip title="自由画笔">
        <Icon
          iconName="EditCreate"
        />
      </Tooltip>
    </Popover>
  </div>
);
function useDrawing() {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const startDraw = (e: any) => {
    if (state.selectShape === 'ERASER' || state.selectShape === 'PEN') {
      dispatch({
        type: 'setLastLine',
        payload: {
          fill: penColor,
          points: [calcX(e.x, state.stageScale, state.stagePos.x), calcY(e.y, state.stageScale, state.stagePos.y)],
          type: 'CURVELINE',
          size: penSize,
        },
      });
      dispatch({ type: 'setIsPainting', payload: true });
    }
  };
  const onMouseUp = () => {
    if (state.isPainting) {
      if (state.lastLine.points.length > 2) {
        const ops = state.OpList;
        ops.push(JSON.stringify(doc.data.shapes));
        dispatch({ type: 'setOpList', payload: ops });
      }
      dispatch({ type: 'setIsPainting', payload: false });
      if (state.selectShape === 'PEN') {
        doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: state.lastLine }]);
        dispatch({
          type: 'setLastLine',
          payload: {
            fill: penColor,
            // @ts-ignore
            points: [0, 0],
            type: 'CURVELINE',
            size: penSize,
          },
        });
      }
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', startDraw);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousedown', startDraw);
    };
  });
}
export default FreeDrawing;
export { useDrawing };
