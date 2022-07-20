import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import { useDispatchStore, useStateStore } from '../../../store/store';

const Lock: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const lockItem: Function = () => {
    const ops = state.OpList;
    ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const afterE: BaseShapes.Shape = { ...state.currentDoc.value.data.shapes[state.currentIndex], draggable: !state.currentDoc.value.data.shapes[state.currentIndex].draggable };
    state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
  };
  return (
    <div className="tool_icon">
      <Icon
        iconName={state.currentDoc.value.data.shapes.length !== 0 && state.currentDoc.value.data.shapes[state.currentIndex].draggable ? 'UnLock' : 'Lock'}
        onClick={() => { lockItem(); }}
      />
    </div>
  );
};
export default Lock;
