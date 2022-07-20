import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import {
  Col, Popover, Row, Tooltip,
} from 'antd';
import { useDispatchStore, useStateStore } from '../../../store/store';

const gridStyle:any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
const Content: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <>
      <Row style={{ width: 'auto', height: 'auto' }} gutter={16}>
        <Col
          span={8}
          role="button"
          tabIndex={0}
          onClick={() => {
            const ops = state.OpList;
            ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
            dispatch({ type: 'setOpList', payload: ops });
            const afterE: BaseShapes.Shape = { ...state.currentDoc.value.data.shapes[state.currentIndex] };
            state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: afterE }]);
            state.currentDoc.value.submitOp([{ p: ['shapes', state.currentDoc.value.data.shapes.length], li: afterE }]);
            dispatch({ type: 'setCurrentIndex', payload: -1 });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="Up"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={-1}
          // eslint-disable-next-line max-len
          onClick={() => {
            const ops = state.OpList;
            ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
            dispatch({ type: 'setOpList', payload: ops });
            const afterE: BaseShapes.Shape = { ...state.currentDoc.value.data.shapes[state.currentIndex] };
            state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: afterE }]);
            state.currentDoc.value.submitOp([{ p: ['shapes', 0], li: afterE }]);
            dispatch({ type: 'setCurrentIndex', payload: -1 });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="Down"
          />
        </Col>
      </Row>
    </>
  );
};
const ZIndex = () => (
  <div className="tool_icon">
    <Popover trigger="click" placement="top" content={Content}>
      <Tooltip title="置于底层/顶层">
        <Icon
          iconName="ScrollUpDown"
        />
      </Tooltip>
    </Popover>
  </div>
);
export default ZIndex;
