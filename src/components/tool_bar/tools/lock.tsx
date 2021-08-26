import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import getCurrentDoc from '../../../client/client';
import { useDispatchStore, useStateStore } from '../../../store/store';

const doc = getCurrentDoc();
const Lock: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const lockItem: Function = () => {
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const afterE: BaseShapes.Shape = { ...doc.data.shapes[state.currentIndex], draggable: !doc.data.shapes[state.currentIndex].draggable };
    doc.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
  };
  return (
    <div className="tool_icon">
      <Icon
        iconName={doc.data.shapes.length !== 0 && doc.data.shapes[state.currentIndex].draggable ? 'UnLock' : 'Lock'}
        onClick={() => { lockItem(); }}
      />
    </div>
  );
};
export default Lock;
