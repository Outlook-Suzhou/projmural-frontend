import React from 'react';
import { Select, Tooltip } from 'antd';
import getCurrentDoc from '../../../client/client';
import { useDispatchStore, useStateStore } from '../../../store/store';

const doc = getCurrentDoc();
const ItemStatus: React.FC<{}> = () => {
  const { Option } = Select;
  const state = useStateStore();
  const dispatch = useDispatchStore();
  function projStatusChange(e: any) {
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const { projs } = doc.value.data.shapes[state.currentIndex];
    projs[state.currentItem.selectProj].status = e;
    const afterE = { ...doc.value.data.shapes[state.currentIndex], projs };
    doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
  }
  return (
    <Tooltip title="编辑状态">
      <>
        {/* eslint-disable-next-line max-len */}
        <Select value={doc.value.data.shapes[state.currentIndex].projs[state.currentItem.selectProj].status} style={{ alignSelf: 'center', marginRight: '10px' }} onChange={projStatusChange}>
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
