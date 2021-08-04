import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import doc from '../../../client/client';
import { useStateStore, useDispatchStore } from '../../../store/store';

const Lock: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const lockItem: Function = () => {
    const afterE: BaseShapes.Shape = { ...state.currentItem, draggable: !state.currentItem.draggable };
    doc.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
    dispatch({ type: 'setCurrentItem', payload: afterE });
  };
  return (
    <div className="tool_icon">
      <Icon
        iconName={state.currentItem.draggable ? 'Lock' : 'UnLock'}
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { lockItem(); }}
      />
    </div>
  );
};
export default Lock;
