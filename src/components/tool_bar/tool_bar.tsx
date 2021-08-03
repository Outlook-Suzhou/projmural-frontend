/* eslint-disable react/require-default-props */
import React from 'react';
// import toolList from './tool_list';
// import AddShape from './tools/add_shape';
import './tool_bar.scss';
// import { Row, Col } from 'antd';

// interface toolComponent {
//   Component: React.FC<any>,
//   currentShape?: any,
//   currentIndex?: number
// }

interface toolBarAttribute{
  width: number,
  height: number,
  list: React.FC<any>[],
  isFloatBar: Boolean,
  currentItem?: any,
  currentIndex?: number
  setCurrentItem?: any,
  setCurrentIndex?: any,
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const {
    width, height, list, isFloatBar, currentItem, currentIndex, setCurrentItem, setCurrentIndex,
  } = props;
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <div
      className={['toolbar', (isFloatBar ? 'float_tool_bar' : 'left_tool_bar')].join(' ')}
      style={{
        width,
        height,
        left: currentItem.x + 200,
        top: currentItem.y - 100,
      }}
    >
      {
        list.map((Item) => (
          <Item currentItem={currentItem} currentIndex={currentIndex} setCurrentItem={setCurrentItem} setCurrentIndex={setCurrentIndex} />
        ))
      }
    </div>
  );
};
export default ToolBar;
