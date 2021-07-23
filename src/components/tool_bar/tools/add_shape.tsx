import React from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import 'antd/dist/antd.css';

const AddShape: React.FC<{}> = () => (
  <div className="tool_icon">
    <Popover title="Title" trigger="click">
      <PlusSquareOutlined width="40px" height="40px" />
    </Popover>
  </div>

);
export default AddShape;
