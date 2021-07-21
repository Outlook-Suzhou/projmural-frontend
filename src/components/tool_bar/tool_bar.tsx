import React from 'react';
// import toolList from './tool_list';
// import AddShape from './tools/add_shape';
import './tool_bar.scss';

interface toolBarAttribute{
  width: number,
  height: number,
  list: React.FC<any>[],
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const { width, height, list } = props;
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <div className="toolbar" style={{ width, height }}>

      {
        list.map((Item) => (
          <div className="tool">
            <Item />
          </div>
        ))
      }
    </div>
  );
};
export default ToolBar;
