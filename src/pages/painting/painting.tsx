/* eslint-disable */
import React from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../components/tool_bar/tools/add_shape';
import addRectangle from '../../utils/add_rectangle';
import addCircle from '../../utils/add_circle';
import addEllipse from '../../utils/add_circle';
import addDiamond from '../../utils/add_diamond';

const Paiting: React.FC<{}> = () => {
  const list: any[] = [AddShape];
  return (
    <div className="paiting">
      <ToolBar width={800} height={200} list={list} />
      <button type="button" onClick={() => addRectangle({width: 20, height: 50, x: 30, y: 40, type: 'RECTANGLE'})}>rect</button>
      <button type="button" onClick={() => addCircle({radius: 30, x: 30, y: 40, type: 'CIRCLE'})}>circle</button>
      <button type="button" onClick={() => addEllipse({radius: {x: 20, y: 30}, x: 30, y: 40, type: 'ELLIPSE'})}>ellipse</button>
      <button type="button" onClick={() => addDiamond({radius: {x: 40, y: 25}, x: 30, y: 40, type: 'DIAMOND'})}>diamond</button>
      <PaitingContent />
    </div>
  );
};
export default Paiting;
