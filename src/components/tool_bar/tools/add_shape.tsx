import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Card } from 'antd';
import 'antd/dist/antd.css';
import addRectangle from '../../../utils/add_rectangle';
import addCircle from '../../../utils/add_circle';
import addEllipse from '../../../utils/add_ellipse';
import addTriangle from '../../../utils/add_triangle';
import addLine from '../../../utils/add_line';

initializeIcons();

const gridStyle:any = {
  width: '33%',
  textAlign: 'center',
};
const shapes: React.FC<{}> = () => (
  <Card>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="RectangleShape"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0, fill: 'blue',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Line"
        style={{ fontSize: '20px' }}
        onClick={() => addLine({
          x: 0, y: 0, start: { x: 20, y: 20 }, end: { x: 50, y: 40 }, weight: 5, type: 'LINE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="CircleRing"
        style={{ fontSize: '20px' }}
        onClick={() => addCircle({
          radius: 30, x: 30, y: 40, type: 'CIRCLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="TriangleShape"
        style={{ fontSize: '20px' }}
        onClick={() => addTriangle({
          x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Ellipse"
        style={{ fontSize: '20px' }}
        onClick={() => addEllipse({
          radius: { x: 20, y: 30 }, x: 30, y: 40, type: 'ELLIPSE',
        })}
      />
    </Card.Grid>
  </Card>
);

const AddShape: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon" style={{ textAlign: 'center' }}>
    <Popover trigger="click" placement="right" content={shapes}>
      <Icon iconName="stop" style={{ fontSize: '50px' }} />
    </Popover>
  </div>

);
export default AddShape;
