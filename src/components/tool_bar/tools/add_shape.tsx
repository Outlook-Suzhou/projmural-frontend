import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeIcons } from '@fluentui/font-icons-mdl2';
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Card } from 'antd';
import 'antd/dist/antd.css';
import addObject from '../../../utils/add_object';

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
        onClick={() => addObject({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0,
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Line"
        style={{ fontSize: '20px' }}
        onClick={() => addObject({
          x: 0, y: 0, start: { x: 20, y: 20 }, end: { x: 50, y: 40 }, weight: 5, type: 'LINE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="CircleRing"
        style={{ fontSize: '20px' }}
        onClick={() => addObject({
          radius: 30, x: 30, y: 40, type: 'CIRCLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="TriangleShape"
        style={{ fontSize: '20px' }}
        onClick={() => addObject({
          x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Ellipse"
        style={{ fontSize: '20px' }}
        onClick={() => addObject({
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
