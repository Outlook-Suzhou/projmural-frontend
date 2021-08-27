import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import {
  Input, Modal, Select, Tooltip,
} from 'antd';
import { useStateStore } from '../../../store/store';
import getCurrentDoc from '../../../client/client';

const doc = getCurrentDoc();
const AddItem: React.FC<{}> = () => {
  const state = useStateStore();
  const [modalVisible, setModalVisible] = useState(false);
  const color = ['#FFC500', '#3F53D9', '#FFBFBF', '#ff653b', '#1e9575'];
  const [proj, setProj] = useState({ name: 'proj', color: '#FFC500', y: 20 });
  const handleOk = () => {
    const kanban = doc.data.shapes[state.currentIndex];
    kanban.projs.push({
      text: proj.name, x: 160, y: proj.y, width: 100, visible: true, color: proj.color,
    });
    doc.submitOp([{ p: ['shapes', state.currentIndex], ld: doc.data.shapes[state.currentIndex], li: kanban }]);
    setModalVisible(false);
  };
  function onChangeTeam(t: string) {
    for (let i = 0; i < doc.data.shapes[state.currentIndex].teams.length; i += 1) {
      if (doc.data.shapes[state.currentIndex].teams[i].text === t) {
        setProj({
          ...proj,
          color: color[i],
          y: proj.y + i * 60,
        });
        return;
      }
    }
  }
  function projNameChange(e: any) {
    console.log(e.target.value);
    setProj({
      ...proj,
      name: e.target.value,
    });
  }
  const { Option } = Select;
  return (
    <div className="tool_icon">
      <Tooltip title="添加项目">
        <Icon
          iconName="Addto"
          onClick={() => {
            setModalVisible(true);
          }}
        />
      </Tooltip>
      <Modal title="Please input journey map info" visible={modalVisible} onOk={handleOk} onCancel={() => { setModalVisible(false); }}>
        <div>
          <>Input the name of project:</>
          <Input onChange={projNameChange} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <>choose the team:</>
          <Select defaultValue={doc.data.shapes[state.currentIndex].teams[0].text} style={{ width: 120, marginLeft: '10px' }} onChange={onChangeTeam}>
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
