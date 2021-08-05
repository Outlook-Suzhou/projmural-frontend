import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import {
  Col, Popover, Row, Tooltip,
} from 'antd';
import doc from '../../../client/client';
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
      <Row style={{ width: '120px', height: 'auto' }} gutter={16}>
        <Col
          span={8}
          role="button"
          tabIndex={0}
          onClick={() => {
            doc.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem }]);
            doc.submitOp([{ p: ['shapes', doc.data.shapes.length], li: state.currentItem }]);
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
            doc.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem }]);
            doc.submitOp([{ p: ['shapes', 0], li: state.currentItem }]);
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
          iconName="SwitcherStartEnd"
          style={{ fontSize: '40px', margin: 'auto' }}
        />
      </Tooltip>
    </Popover>
  </div>
);
export default ZIndex;
