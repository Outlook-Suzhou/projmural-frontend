import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
// @ts-ignore
import { TwitterPicker } from 'react-color';
import changeColor from '../../../utils/change_color';

interface Props {
    index: number,
    item: BaseShapes.Rectangle,
}
const SelectColor = (props: Props) => {
  const { index, item } = props;
  // @ts-ignore
  const [isClicked, setClicked] = useState(false);
  const handlePickComplete = (color:any) => {
    item.fill = color.hex;
    changeColor(index, item);
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
      { isClicked ? <TwitterPicker color={item.fill} onChangeComplete={handlePickComplete} /> : null}
    </div>
  );
};
export default SelectColor;
