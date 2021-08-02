/* eslint-disable */
import React, {useState} from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../components/tool_bar/tools/add_shape';
import addRectangle from '../../utils/add_rectangle';
import addCircle from '../../utils/add_circle';
import addEllipse from '../../utils/add_circle';
import addDiamond from '../../utils/add_diamond';
import addTriangle from '../../utils/add_triangle';
import addLine from '../../utils/add_line';
import {Modal} from "antd";

const Painting: React.FC<{}> = () => {
  return (
    <div className="paiting" >
      <button type="button" onClick={() => addRectangle({width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE', rotation: 0, fill: 'blue' })}>rect</button>
      <button type="button" onClick={() => addCircle({radius: 30, x: 30, y: 40, type: 'CIRCLE'})}>circle</button>
      <button type="button" onClick={() => addEllipse({radius: {x: 20, y: 30}, x: 30, y: 40, type: 'ELLIPSE'})}>ellipse</button>
      <button type="button" onClick={() => addDiamond({radius: {x: 40, y: 25}, x: 30, y: 40, type: 'DIAMOND'})}>diamond</button>
      <button type="button" onClick={() => addLine({x: 0, y: 0, start: {x: 20, y: 20}, end: {x: 50, y: 40}, weight: 5, type: 'LINE'})}>line</button>
      <button type="button" onClick={() => addTriangle({x: 30, y: 40, points: [0, 0, 100, 0, 100, 100], type: 'TRIANGLE'})}>triangle</button>
      <PaitingContent />
    </div>
  );
};
export default Painting;
