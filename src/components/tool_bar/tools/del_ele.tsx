import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import { Tooltip } from 'antd';
import { useDispatchStore, useStateStore } from '../../../store/store';

const DelEle: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Tooltip title="删除元素">
        <Icon
          iconName="Delete"
          onClick={() => {
            const ops = state.OpList;
            ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
            dispatch({ type: 'setOpList', payload: ops });
            if (state.currentDoc.value.data.shapes[state.currentIndex].type === 'KANBAN' && state.currentItem.selectProj !== -1) {
              const { projs } = state.currentItem;
              projs.splice(state.currentItem.selectProj, 1);
              state.currentDoc.value.submitOp(
                [{ p: ['shapes', state.currentIndex], ld: state.currentDoc.value.data.shapes[state.currentIndex], li: { ...state.currentItem, projs, selectProj: -1 } }],
              );
              dispatch({ type: 'setCurrentItem', payload: { ...state.currentItem, projs, selectProj: -1 } });
              dispatch({ type: 'setCurrentIndex', payload: -1 });
            } else {
              state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem }]);
              dispatch({ type: 'setCurrentIndex', payload: -1 });
            }
          }}
        />
      </Tooltip>
    </div>
  );
};
export default DelEle;
