import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
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
    ops.push(JSON.stringify(doc.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    console.log(color.hex);
    const afterE = { ...doc.data.shapes[state.currentIndex], fill: color.hex };
    changeColor(state.currentIndex, afterE);
    setClicked(false);
  };

  return (
    <div className="tool_icon">
      <Icon
        iconName="Color"
        onClick={() => { setClicked(true); }}
      />
      { isClicked ? <TwitterPicker color={state.currentItem.fill} onChangeComplete={handlePickComplete} /> : null}
    </div>
  );
};
export default SelectColor;
