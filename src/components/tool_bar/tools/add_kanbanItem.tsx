import React from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Tooltip } from 'antd';
import { useStateStore } from '../../../store/store';
import getCurrentDoc from '../../../client/client';

const doc = getCurrentDoc();
const AddItem: React.FC<{}> = () => {
  const state = useStateStore();
  return (
    <div className="tool_icon">
      <Tooltip title="添加项目">
        <Icon
          iconName="Addto"
          onClick={() => {
            const kanban = doc.value.data.shapes[state.currentIndex];
            kanban.projs.push({ text: 'testProj', x: 20, y: 20 });
            doc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: doc.value.data.shapes[state.currentIndex], li: kanban }]);
          }}
        />
      </Tooltip>
    </div>

  );
};
export default AddItem;
