/* eslint-disable */
import React, {useState} from 'react';
import PaitingContent from '../../components/painting_content/painting_content';
import ToolBar from '../../components/tool_bar/tool_bar';
import AddShape from '../../utils/add_function';
import {Modal} from "antd";

const Painting: React.FC<{}> = () => {
  return (
    <div className="paiting" >
      <PaitingContent />
    </div>
  );
};
export default Painting;
