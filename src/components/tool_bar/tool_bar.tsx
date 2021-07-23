import React from 'react';
// import toolList from './tool_list';
// import AddShape from './tools/add_shape';
import './tool_bar.scss';

interface toolComponent {
  Component: React.FC<any>,
  currentShape?: any,
  currentIndex?: number
}

interface toolBarAttribute{
  width: number,
  height: number,
  list: toolComponent[],
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const { width, height, list } = props;
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <div className="toolbar" style={{ width, height }}>
      {
        list.map((item) => (
          <div className="tool">
            <item.Component currentShape={item.currentShape} currentIndex={item.currentIndex} />
          </div>
        ))
      }
    </div>
  );
};
export default ToolBar;
