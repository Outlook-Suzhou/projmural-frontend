import React, { useRef } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import { BsDiamond } from 'react-icons/bs';
import addRectangle from '../../../utils/add_rectangle';
import addCircle from '../../../utils/add_circle';
import addEllipse from '../../../utils/add_ellipse';
import addTriangle from '../../../utils/add_triangle';
import addLine from '../../../utils/add_line';
import addDiamond from '../../../utils/add_diamond';

initializeIcons();

const gridStyle:any = {
  textAlign: 'center',
  cursor: 'pointer',
  fontSize: '30px',
};
const shapes: React.FC<{}> = () => (
  <>
    <Row style={{ width: '120px', height: 'auto' }} gutter={16}>
      <Col
        span={8}
        role="button"
        tabIndex={0}
        onClick={() => addRectangle({
          width: 50, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0, fill: 'blue',
        })}
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
        onClick={() => addLine({
          x: 0, y: 0, start: { x: 20, y: 20 }, end: { x: 50, y: 40 }, weight: 5, type: 'LINE',
        })}
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
        onClick={() => addCircle({
          radius: 30, x: 30, y: 40, type: 'CIRCLE', rotation: 0, fill: 'green',
        })}
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
        onClick={() => addTriangle({
          x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE',
        })}
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
        onClick={() => addEllipse({
          radius: { x: 20, y: 30 }, x: 30, y: 40, type: 'ELLIPSE', rotation: 0, fill: 'green',
        })}
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
        onClick={() => addDiamond({
          radius: { x: 40, y: 25 }, x: 30, y: 40, type: 'DIAMOND', rotation: 0, fill: 'pink',
        })}
        onKeyDown={() => {}}
        style={gridStyle}
      >
        <BsDiamond />
      </Col>
    </Row>
  </>
);

const AddShape: React.FC<{}> = () => {
  const nodeRef = useRef(null);//
  return (
    <div className="tool_icon" style={{ textAlign: 'center' }}>
      <Popover trigger="click" placement="right" content={shapes}>
        <div ref={nodeRef} />
        <Icon iconName="stop" style={{ fontSize: '50px' }} />
      </Popover>
    </div>
  );
};
export default AddShape;
