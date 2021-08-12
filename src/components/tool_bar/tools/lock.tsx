import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import doc from '../../../client/client';
import { useStateStore } from '../../../store/store';

const Lock: React.FC<{}> = () => {
  const state = useStateStore();
  const lockItem: Function = () => {
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
