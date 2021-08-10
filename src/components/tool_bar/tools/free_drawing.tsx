import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import {
  Col, Popover, Tooltip,
} from 'antd';
import { useDispatchStore } from '../../../store/store';

const gridStyle: any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
const Content: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
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
          />
        </Tooltip>
      </Col>
      <Col
        span={8}
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
      <Col
        span={8}
        role="button"
        tabIndex={0}
        onClick={() => {
          dispatch({ type: 'setSelectShape', payload: 'FREE' });
        }}
        style={gridStyle}
      >
        <Tooltip title="退出">
          <Icon
            iconName="clear"
          />
        </Tooltip>
      </Col>
    </>
  );
};
const FreeDrawing: React.FC<{}> = () => (
  <div className="tool_icon">
    <Popover trigger="click" placement="rightBottom" content={Content}>
      <Tooltip title="自由画笔">
        <Icon
          iconName="EditCreate"
          style={{ fontSize: '40px', margin: 'auto' }}
        />
      </Tooltip>
    </Popover>
  </div>
);
export default FreeDrawing;
