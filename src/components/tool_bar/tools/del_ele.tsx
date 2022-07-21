import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import { Tooltip } from 'antd';
import { useDispatchStore, useStateStore } from '../../../store/store';
import { deleteCurrentItem } from '../../../utils/delete_function';

const DelEle: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Tooltip title="删除元素">
        <Icon
          iconName="Delete"
          onClick={() => {
            deleteCurrentItem(state, dispatch);
          }}
        />
      </Tooltip>
    </div>
  );
};
export default DelEle;
