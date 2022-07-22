import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore } from '../../../store/store';

const AddMessage: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Icon
        iconName="Comment"
        onClick={() => dispatch({ type: 'setSelectShape', payload: 'MESSAGE' })}
      />
    </div>
  );
};
export default AddMessage;
