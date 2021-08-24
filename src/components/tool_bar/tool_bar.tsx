import React from 'react';
import './tool_bar.scss';
import { useStateStore } from '../../store/store';
import doc from '../../client/client';
import calcFloatBarPos from '../../utils/calc_floatbar_position';

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
        left: isFloatBar ? calcFloatBarPos(doc.data.shapes[state.currentIndex], state.stageScale, state.stagePos)[0] - 90 : 50,
        top: isFloatBar ? calcFloatBarPos(doc.data.shapes[state.currentIndex], state.stageScale, state.stagePos)[1] - 150 : 200,
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
