/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeIcons } from '@fluentui/font-icons-mdl2';
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { Popover, Card } from 'antd';
import 'antd/dist/antd.css';
import addRectangle from '../../../utils/add_rectangle';

initializeIcons();

// eslint-disable-next-line no-unused-vars
const gridStyle:any = {
  width: '33%',
  textAlign: 'center',
};
// eslint-disable-next-line no-unused-vars
const shapes: React.FC<{}> = () => (
  <Card>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="RectangleShape"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Line"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="CircleRing"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="TriangleShape"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE',
        })}
      />
    </Card.Grid>
    <Card.Grid style={gridStyle}>
      <Icon
        iconName="Ellipse"
        style={{ fontSize: '20px' }}
        onClick={() => addRectangle({
          width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE',
        })}
      />
    </Card.Grid>
  </Card>
);

const AddShape: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon">
    <Popover trigger="click" placement="right" content={shapes}>
      <Icon iconName="stop" style={{ fontSize: '50px', margin: 'auto' }} />
    </Popover>
  </div>

);
export default AddShape;
