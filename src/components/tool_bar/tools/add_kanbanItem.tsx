import React, { useState } from 'react';
import { Icon } from '@fluentui/react/lib/Icon';
import {
  Input, Modal, Select, Tooltip,
} from 'antd';
import { useDispatchStore, useStateStore } from '../../../store/store';

const AddItem: React.FC<{}> = () => {
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const [modalVisible, setModalVisible] = useState(false);
  const color = ['#FFC500', '#0963E3', '#FFBFBF', '#ff653b', '#1e9575'];
  const [proj, setProj] = useState({
    name: 'proj', color: '#FFC500', x: 20, y: 20, status: 'in progress', tags: [],
  });
  const handleOk = () => {
    const ops = state.OpList;
    ops.push(JSON.stringify(state.currentDoc.value.data.shapes));
    dispatch({ type: 'setOpList', payload: ops });
    const kanban = state.currentDoc.value.data.shapes[state.currentIndex];
    kanban.projs.push({
      text: proj.name, y: 60, x: proj.x, width: 100, height: 100, visible: true, color: proj.color, status: proj.status,
    });
    state.currentDoc.value.submitOp([{ p: ['shapes', state.currentIndex], ld: state.currentDoc.value.data.shapes[state.currentIndex], li: kanban }]);
    setModalVisible(false);
  };
  function onChangeTeam(t: string) {
    for (let i = 0; i < state.currentDoc.value.data.shapes[state.currentIndex].teams.length; i += 1) {
      if (state.currentDoc.value.data.shapes[state.currentIndex].teams[i].text === t) {
        setProj({
          ...proj,
          color: color[i % 5],
          x: 20 + i * 300,
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
  function projStatusChange(e: any) {
    setProj({
      ...proj,
      status: e,
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
          <Select defaultValue={state.currentDoc.value.data.shapes[state.currentIndex].teams[0].text} style={{ width: 120, marginLeft: '10px' }} onChange={onChangeTeam}>
            {state.currentDoc.value.data.shapes[state.currentIndex].teams.map((unit: { text: string }) => (
              <Option value={unit.text}>{unit.text}</Option>
            ))}
          </Select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <>choose project status</>
          <Select defaultValue="in progress" style={{ width: 120, marginLeft: '10px' }} onChange={projStatusChange}>
            <Option value="not started">not started</Option>
            <Option value="in progress">in progress</Option>
            <Option value="finished">finished</Option>
            <Option value="blocked">blocked</Option>
          </Select>
        </div>
      </Modal>
    </div>

  );
};
export default AddItem;
