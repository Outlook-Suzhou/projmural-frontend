/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import 'antd/dist/antd.css';
import addRectangle from '../../../utils/add_rectangle';

const AddShape: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon" onClick={() => addRectangle({ width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE' })}>
    <Popover title="Title" trigger="click">
      <PlusSquareOutlined width="40px" height="40px" />
    </Popover>
  </div>

);
export default AddShape;
