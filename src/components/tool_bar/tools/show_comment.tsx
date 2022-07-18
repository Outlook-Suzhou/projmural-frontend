import React from 'react';
import { Switch } from 'antd';
import { useDispatchStore } from '../../../store/store';

const ShowComment: React.FC<{}> = () => {
  const dispatch = useDispatchStore();
  const onChange = (checked: boolean) => {
    dispatch({ type: 'setCommentVisible', payload: checked });
  };
  return (
    <div className="tool_icon">
      <Switch
        onChange={onChange}
        size="small"
      />
    </div>

  );
};
export default ShowComment;
