/* eslint-disable */
import React, {useState} from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../utils/add_function';
import {Modal} from "antd";

const Painting: React.FC<{}> = () => {
  return (
    <div className="paiting" >
      <button type="button" onClick={() => AddShape({width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0, fill: 'blue' })}>rect</button>
      <button type="button" onClick={() => AddShape({radius: 30, x: 30, y: 40, type: 'CIRCLE'})}>circle</button>
      <button type="button" onClick={() => AddShape({radius: {x: 20, y: 30}, x: 30, y: 40, type: 'ELLIPSE'})}>ellipse</button>
      <button type="button" onClick={() => AddShape({radius: {x: 40, y: 25}, x: 30, y: 40, type: 'DIAMOND'})}>diamond</button>
      <button type="button" onClick={() => AddShape({x: 0, y: 0, start: {x: 20, y: 20}, end: {x: 50, y: 40}, weight: 5, type: 'LINE'})}>line</button>
      <button type="button" onClick={() => AddShape({x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE'})}>triangle</button>
      <PaitingContent />
    </div>
  );
};
export default Painting;
