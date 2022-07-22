import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { useDispatchStore } from '../../../store/store';

const AddPointedRect: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Icon
        iconName="EventTentative"
        onClick={() => dispatch({ type: 'setSelectShape', payload: 'POINTEDRECT' })}
      />
    </div>
  );
};
export default AddPointedRect;
