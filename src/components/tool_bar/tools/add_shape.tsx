import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { BsDiamond } from 'react-icons/bs';
import { useDispatchStore } from '../../../store/store';

initializeIcons();

const gridStyle:any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
const shapes: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <>
      <Row style={{ width: '120px', height: 'auto' }} gutter={16}>
        <Col
          span={8}
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'RECTANGLE' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="RectangleShape"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={-1}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'LINE' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="Line"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'CIRCLE' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="CircleRing"
          />
        </Col>
      </Row>
      <Row style={{ width: '120px', height: 'auto' }} gutter={16}>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'TRIANGLE' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="TriangleShape"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'ELLIPSE' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="Ellipse"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'DIAMOND' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <BsDiamond />
        </Col>
      </Row>
      <Row style={{ width: '120px', height: 'auto' }} gutter={16}>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'ARROW' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            iconName="ArrowTallUpRight"
          />
        </Col>
      </Row>
    </>
  );
};

const AddShape: React.FC<{}> = () => {
  const nodeRef = useRef(null);//
  return (
    <div className="tool_icon" style={{ textAlign: 'center' }}>
      <Popover trigger="click" placement="right" content={shapes}>
        <div ref={nodeRef} />
        <Icon iconName="Shapes" style={{ fontSize: '40px' }} />
      </Popover>
    </div>
  );
};
export default AddShape;
