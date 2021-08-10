/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore } from '../../../store/store';

const AddText: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    // eslint-disable-next-line object-curly-newline
    <div className="tool_icon">
      <Icon
        iconName="FontColorA"
        style={{ fontSize: '40px', margin: 'auto' }}
        onClick={() => dispatch({ type: 'setSelectShape', payload: 'TEXT' })}
      />
    </div>

  );
};
export default AddText;
