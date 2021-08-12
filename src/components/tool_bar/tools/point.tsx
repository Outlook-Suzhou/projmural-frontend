/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useDispatchStore, useStateStore } from '../../../store/store';

const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'blue' }],
  common: [{ color: 'unset' }],
});
const Point: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Icon
        iconName="TouchPointer"
        className={state.selectShape === 'FREE' ? classNames.deepSkyBlue : classNames.common}
        onClick={() => {
          dispatch({ type: 'setSelectShape', payload: 'FREE' });
        }}
      />
    </div>

  );
};
export default Point;
