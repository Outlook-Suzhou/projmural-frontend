import React from 'react';
import './tool_bar.scss';
import { useStateStore } from '../../store/store';
import { calcZoomX, calcZoomY } from '../../utils/calc_zoom_position';
import doc from '../../client/client';

interface toolBarAttribute{
  list: React.FC<any>[],
  isFloatBar: Boolean,
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const { list, isFloatBar } = props;
  const state = useStateStore();
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <div
      className={['toolbar', (isFloatBar ? 'float_tool_bar' : 'left_tool_bar')].join(' ')}
      style={{
        left: isFloatBar ? calcZoomX(doc.data.shapes[state.currentIndex].x, state.stageScale, state.stagePos.x) - 50 : 50,
        top: isFloatBar ? calcZoomY(doc.data.shapes[state.currentIndex].y, state.stageScale, state.stagePos.y) - 200 : 200,
      }}
    >
      {
        list.map((Item) => (
          <Item />
        ))
      }
    </div>
  );
};
export default ToolBar;
