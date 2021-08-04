import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
import changeColor from '../../../utils/change_color';
import { useStateStore, useDispatchStore } from '../../../store/store';

const SelectColor = () => {
  // @ts-ignore
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [isClicked, setClicked] = useState(false);
  const handlePickComplete = (color: any) => {
    state.currentItem.fill = color.hex;
    dispatch({ type: 'setCurrentItem', payload: { ...state.currentItem, fill: color.hex } });
    console.log(color.hex);
    changeColor(state.currentIndex, state.currentItem);
    setClicked(false);
  };

  return (
    <div className="tool_icon">
      <Icon
        iconName="Color"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { setClicked(true); }}
      />
      {/* eslint-disable-next-line max-len */}
      { isClicked ? <TwitterPicker color={state.currentItem.fill} onChangeComplete={handlePickComplete} /> : null}
    </div>
  );
};
export default SelectColor;
