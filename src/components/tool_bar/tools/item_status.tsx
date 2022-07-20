import React from 'react';
import { Select, Tooltip } from 'antd';
import { useDispatchStore, useStateStore } from '../../../store/store';

const ItemStatus: React.FC<{}> = () => {
  const { Option } = Select;
  const state = useStateStore();
  const dispatch = useDispatchStore();
  function projStatusChange(e: any) {
    const ops = state.OpList;
    ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const { projs } = state.currentDoc.value.data.shapes[state.currentIndex];
    projs[state.currentItem.selectProj].status = e;
    const afterE = { ...state.currentDoc.value.data.shapes[state.currentIndex], projs };
    state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
  }
  return (
    <Tooltip title="编辑状态">
      <>
        {/* eslint-disable-next-line max-len */}
        <Select value={state.currentDoc.value.data.shapes[state.currentIndex].projs[state.currentItem.selectProj].status} style={{ alignSelf: 'center', marginRight: '10px' }} onChange={projStatusChange}>
          <Option value="not started">not started</Option>
          <Option value="in progress">in progress</Option>
          <Option value="finished">finished</Option>
          <Option value="blocked">blocked</Option>
        </Select>
      </>
    </Tooltip>
  );
};

export default ItemStatus;
