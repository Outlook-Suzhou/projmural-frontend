/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line no-unused-vars
import { Icon } from '@fluentui/react/lib/Icon';
import { Tooltip } from 'antd';
import getCurrentDoc from '../../../client/client';

const doc = getCurrentDoc();
const AddKanBan: React.FC<{}> = () => (
  // eslint-disable-next-line object-curly-newline
  <div className="tool_icon">
    <Tooltip title="项目看板">
      <Icon
        iconName="Calendar"
        onClick={() => {
          const teams = [];
          const teamNum = 5;
          const dateNum = 15;
          const ind = doc.value.data.shapes.length;
          for (let i = 0; i < teamNum; i += 1) {
            teams.push({
              // eslint-disable-next-line max-len
              width: 120, height: 25, x: 20, y: 20 + i * 60, text: `Team${i + 1}`, fontSize: 12, fill: '#ffffff', visible: true,
            });
          }
          doc.value.submitOp([{
            p: ['shapes', ind],
            li: {
              type: 'KANBAN', dateNum, teamNum, x: 10, y: 10, teams, shift: {}, projs: [], draggable: true,
            },
          }]);
        }}
      />
    </Tooltip>
  </div>

);
export default AddKanBan;
