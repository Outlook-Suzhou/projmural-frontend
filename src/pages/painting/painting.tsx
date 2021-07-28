/* eslint-disable */
import React, {useState} from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import addObject from '../../utils/add_object';
import {Modal} from "antd";

const Painting: React.FC<{}> = () => {
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal=()=>{
        setIsModalVisible(true);
    }
  return (
    <div className="paiting" >
      <button type="button" onClick={() => addObject({width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0})}>rect</button>
      <button type="button" onClick={() => addObject({radius: 30, x: 30, y: 40, type: 'CIRCLE'})}>circle</button>
      <button type="button" onClick={() => addObject({radius: {x: 20, y: 30}, x: 30, y: 40, type: 'ELLIPSE'})}>ellipse</button>
      <button type="button" onClick={() => addObject({radius: {x: 40, y: 25}, x: 30, y: 40, type: 'DIAMOND'})}>diamond</button>
      <button type="button" onClick={() => addObject({x: 0, y: 0, start: {x: 20, y: 20}, end: {x: 50, y: 40}, weight: 5, type: 'LINE'})}>line</button>
      <button type="button" onClick={() => addObject({x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE'})}>triangle</button>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            abcd
        </Modal>
      <PaitingContent />
    </div>
  );
};
export default Painting;
