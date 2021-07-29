/* eslint-disable react/require-default-props */
import React from 'react';
// import toolList from './tool_list';
// import AddShape from './tools/add_shape';
import './tool_bar.scss';
import { Row, Col } from 'antd';

// interface toolComponent {
//   Component: React.FC<any>,
//   currentShape?: any,
//   currentIndex?: number
// }

interface toolBarAttribute{
  width: number,
  height: number,
  list: React.FC<any>[],
  currentShape?: any,
  currentIndex?: number
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const { width, height, list } = props;
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <Row
      className="toolbar"
      style={{
        width, height, margin: '100px auto', border: 'solid', boxShadow: '5px 5px 5px #888888',
      }}
    >
      {
        list.map((Item) => (
          <Col
            className="tool"
            style={{ width: '100%', textAlign: 'center' }}
          >
            <Item currentShape={props.currentShape} currentIndex={props.currentIndex} />
          </Col>
        ))
      }
    </Row>
  );
};
export default ToolBar;
