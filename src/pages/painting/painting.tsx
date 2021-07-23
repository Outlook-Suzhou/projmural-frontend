/* eslint-disable */
import React from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../components/tool_bar/tools/add_shape';
import addRectangle from '../../utils/add_rectangle';
const Paiting: React.FC<{}> = () => {
  const list: React.FC<any>[] = [AddShape, AddShape, AddShape];
  return (
    <div className="paiting">
      <ToolBar width={800} height={200} list={list} />
      <button type="button" onClick={() => addRectangle({width: 20, height: 50, x: 30, y: 40})}>Test</button>
      <PaitingContent />
    </div>
  );
};
export default Paiting;
