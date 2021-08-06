import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
import changeColor from '../../../utils/change_color';
import { useStateStore } from '../../../store/store';
import doc from '../../../client/client';

const SelectColor = () => {
  // @ts-ignore
  const state = useStateStore();
  const [isClicked, setClicked] = useState(false);
  const handlePickComplete = (color: any) => {
    console.log(color.hex);
    const afterE = { ...doc.data.shapes[state.currentIndex], fill: color.hex };
    changeColor(state.currentIndex, afterE);
    setClicked(false);
  };

  return (
    <div className="tool_icon">
      <Icon
        iconName="Color"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => { setClicked(true); }}
      />
      { isClicked ? <TwitterPicker color={state.currentItem.fill} onChangeComplete={handlePickComplete} /> : null}
    </div>
  );
};
export default SelectColor;
