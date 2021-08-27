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
            const kanban = doc.data.shapes[state.currentIndex];
            kanban.projs.push({
              text: 'testProj', x: 160, y: 20, width: 100, visible: true,
            });
            doc.submitOp([{ p: ['shapes', state.currentIndex], ld: doc.data.shapes[state.currentIndex], li: kanban }]);
          }}
        />
      </Tooltip>
    </div>

  );
};
export default AddItem;
