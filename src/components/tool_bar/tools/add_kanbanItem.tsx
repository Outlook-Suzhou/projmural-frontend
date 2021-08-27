import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import { Modal, Select, Tooltip } from 'antd';
import { useStateStore } from '../../../store/store';
import doc from '../../../client/client';

const AddItem: React.FC<{}> = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const color = ['#FFC500', '#3F53D9', '#FFBFBF', '#ff653b', '#1e9575'];
  const [proj, setProj] = useState({ name: 'proj', color: '#FFC500' });
  const handleOk = () => {
    setModalVisible(false);
  };
  const onChangeTeam = () => {
    console.log(color[0]);
  };
  const state = useStateStore();
  const { Option } = Select;
  return (
    <div className="tool_icon">
      <Tooltip title="添加项目">
        <Icon
          iconName="Addto"
          onClick={() => {
            const kanban = doc.data.shapes[state.currentIndex];
            kanban.projs.push({
              text: proj.name, x: 160, y: 20, width: 100, visible: true, color:proj.color,
            });
            doc.submitOp([{ p: ['shapes', state.currentIndex], ld: doc.data.shapes[state.currentIndex], li: kanban }]);
          }}
        />
      </Tooltip>
      <Modal title="Please input journey map info" visible={modalVisible} onOk={handleOk} onCancel={() => { setModalVisible(false); }}>
        <div>
          <>choose the team:</>
          <Select defaultValue="day" style={{ width: 120 }} onChange={onChangeTeam}>
            {doc.data.shapes[state.currentIndex].teams.map((unit: { text: string }) => (
              <Option value={unit.text}>{unit.text}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    </div>

  );
};
export default AddItem;
