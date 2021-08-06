import { Icon } from '@fluentui/react/lib/Icon';
import React from 'react';
import { Tooltip } from 'antd';
import doc from '../../../client/client';
import { useDispatchStore, useStateStore } from '../../../store/store';

const DelEle: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  return (
    <div className="tool_icon">
      <Tooltip title="删除元素">
        <Icon
          iconName="Delete"
          style={{ fontSize: '40px', margin: 'auto' }}
          onClick={() => {
            doc.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentItem }]);
            dispatch({ type: 'setCurrentIndex', payload: -1 });
          }}
        />
      </Tooltip>
    </div>
  );
};
export default DelEle;