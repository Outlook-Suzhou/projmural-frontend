import React from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../components/tool_bar/tools/add_shape';

const Paiting: React.FC<{}> = () => {
  const list: React.FC<any>[] = [AddShape, AddShape, AddShape];
  return (
    <div className="paiting">
      <ToolBar width={800} height={200} list={list} />
      <PaitingContent />
    </div>
  );
};
export default Paiting;
