import React from 'react';
import { Select, Tooltip } from 'antd';
import getCurrentDoc from '../../../client/client';
import { useStateStore } from '../../../store/store';

const doc = getCurrentDoc();
const ItemStatus: React.FC<{}> = () => {
  const { Option } = Select;
  const state = useStateStore();
  function projStatusChange(e: any) {
    const { projs } = state.currentItem;
    projs[state.currentItem.selectProj].status = e;
    const afterE = { ...doc.value.data.shapes[state.currentIndex], projs };
    doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
  }
  return (
    <Tooltip title="编辑状态">
      <>
        <Select value={state.currentItem.projs[state.currentItem.selectProj].status} style={{ alignSelf: 'center', marginRight: '10px' }} onChange={projStatusChange}>
          <Option value="pending">pending</Option>
          <Option value="finished">finished</Option>
          <Option value="blocked">blocked</Option>
        </Select>
      </>
    </Tooltip>
  );
};

export default ItemStatus;
