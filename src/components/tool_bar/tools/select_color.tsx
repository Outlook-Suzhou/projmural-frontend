import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
import {
  InputNumber,
} from 'antd';
import changeColor from '../../../utils/change_color';
import { useDispatchStore, useStateStore } from '../../../store/store';
import getCurrentDoc from '../../../client/client';

const doc = getCurrentDoc();
const SelectColor = () => {
  // @ts-ignore
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [isClicked, setClicked] = useState(false);
  const handlePickComplete = (color: any) => {
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    if (doc.value.data.shapes[state.currentIndex].type === 'KANBAN' && state.currentItem.selectProj !== -1) {
      const { projs } = doc.value.data.shapes[state.currentIndex];
      projs[state.currentItem.selectProj].color = color.hex;
      const afterE = { ...doc.value.data.shapes[state.currentIndex], projs };
      changeColor(state.currentIndex, afterE);
    } else {
      const afterE = { ...doc.value.data.shapes[state.currentIndex], fill: color.hex };
      changeColor(state.currentIndex, afterE);
    }
    setClicked(false);
  };

  function onChangeOpacity(value: number) {
    const ops = state.OpList;
    ops.push(JSON.stringify(doc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const afterE: BaseShapes.Shape = { ...doc.value.data.shapes[state.currentIndex], opacity: value };
    doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem, li: afterE }]);
    dispatch({ type: 'setCurrentItem', payload: afterE });
  }
  return (
    <div className="tool_icon">
      <Icon
        iconName="Color"
        onClick={() => { setClicked(true); }}
      />
      { isClicked ? <TwitterPicker color={state.currentItem.fill} onChangeComplete={handlePickComplete} /> : null}
      { isClicked
        ? (
          <InputNumber
            addonBefore="Opacity:   "
            defaultValue={0.9}
            min={0}
            max={1}
            step={0.01}
            value={state.currentItem.opacity}
            style={{ height: '35px', margin: '15px', width: '140px' }}
            onChange={onChangeOpacity}
          />
        )
        : null}
    </div>
  );
};
export default SelectColor;
