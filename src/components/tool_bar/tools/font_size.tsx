import React from 'react';
import { InputNumber, Tooltip } from 'antd';
import getCurrentDoc from '../../../client/client';
import { useDispatchStore, useStateStore } from '../../../store/store';

const doc = getCurrentDoc();
const FontSize: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  function onChange(value: number) {
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const afterE: BaseShapes.Shape = { ...doc.value.data.shapes[state.currentIndex], fontSize: value };
    doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
    dispatch({ type: 'setCurrentItem', payload: afterE });
  }
  return (
    <Tooltip title="字体大小">
      <InputNumber min={5} max={50} value={state.currentItem.fontSize} onChange={onChange} style={{ height: '35px', margin: '15px', width: '50px' }} />
    </Tooltip>
  );
};

export default FontSize;
