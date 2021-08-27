import React, { useRef } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Row, Col } from 'antd';
import { BsDiamond } from 'react-icons/bs';
import { useDispatchStore } from '../../../store/store';

const gridStyle:any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '25px',
};

const shapes: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <>
      <Row gutter={16}>
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
            className="icons"
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
            className="icons"
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
            className="icons"
            iconName="CircleRing"
          />
        </Col>
      </Row>
      <Row gutter={16}>
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
            className="icons"
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
            className="icons"
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
          <BsDiamond className="icons" />
        </Col>
      </Row>
      <Row gutter={16}>
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
            className="icons"
            iconName="ArrowTallUpRight"
          />
        </Col>
        <Col
          span={8}
          className="chooseShapeButton"
          role="button"
          tabIndex={0}
          onClick={() => {
            dispatch({ type: 'setSelectShape', payload: 'STAR' });
          }}
          onKeyDown={() => {}}
          style={gridStyle}
        >
          <Icon
            className="icons"
            iconName="FavoriteStar"
          />
        </Col>
      </Row>
    </>
  );
};

const AddShape: React.FC<{}> = () => {
  const nodeRef = useRef(null);//
  return (
    <div className="tool_icon">
      <Popover placement="right" content={shapes} trigger="hover">
        <div ref={nodeRef} />
        <Icon iconName="Shapes" />
      </Popover>
    </div>
  );
};
export default AddShape;
