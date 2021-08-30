import React from 'react';
import './tool_bar.scss';
import { useStateStore } from '../../store/store';
import getCurrentDoc from '../../client/client';
import calcFloatBarPos from '../../utils/calc_floatbar_position';

const doc = getCurrentDoc();
interface toolBarAttribute{
  list: React.FC<any>[],
  BarType: string,
}

const ToolBar: React.FC<toolBarAttribute> = (props: toolBarAttribute) => {
  const { list, BarType } = props;
  const state = useStateStore();
  // const showList: any[] = list.map((item) => <li>{toolList[item]}</li>);
  return (
    <div
        // eslint-disable-next-line no-nested-ternary
      className={['toolbar', (BarType === 'float' ? 'float_tool_bar' : BarType === 'left' ? 'left_tool_bar' : 'avatar_tool_bar')].join(' ')}
      style={{
        // eslint-disable-next-line no-nested-ternary
        left: BarType === 'float' ? calcFloatBarPos(doc.value.data.shapes[state.currentIndex], state.stageScale, state.stagePos)[0] - 90
          : BarType === 'left' ? 50 : window.innerWidth * 0.85,
        // eslint-disable-next-line no-nested-ternary
        top: BarType === 'float' ? calcFloatBarPos(doc.value.data.shapes[state.currentIndex], state.stageScale, state.stagePos)[1] - 150
          : BarType === 'left' ? window.innerHeight * 0.15 : 50,
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
