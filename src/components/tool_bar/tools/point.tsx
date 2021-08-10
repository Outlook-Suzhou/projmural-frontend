/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { mergeStyles, mergeStyleSets } from '@fluentui/react/lib/Styling';
import { useDispatchStore, useStateStore } from '../../../store/store';

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
});
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
  common: [{ color: 'unset' }, iconClass],
});
const Point: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    // eslint-disable-next-line object-curly-newline
    <div className="tool_icon">
      <Icon
        iconName="TouchPointer"
        style={{ fontSize: '40px', margin: 'auto' }}
        color="deepskyblue"
        className={state.drawing === 0 ? classNames.deepSkyBlue : classNames.common}
        onClick={() => {
          dispatch({ type: 'setDrawing', payload: 0 });
          dispatch({ type: 'setSelectShape', payload: 'FREE' });
        }}
      />
    </div>

  );
};
export default Point;
