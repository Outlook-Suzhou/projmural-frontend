import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore } from '../../../store/store';

const AddTip: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Icon
        iconName="QuickNote"
        onClick={() => dispatch({ type: 'setSelectShape', payload: 'TEXTRECT' })}
      />
    </div>

  );
};
export default AddTip;
