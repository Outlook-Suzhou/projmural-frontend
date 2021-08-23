import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import axios from 'axios';
import {
  InputNumber, Modal,
} from 'antd';

const Dashboard: React.FC<{}> = () => {
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [kanban, setKanban] = useState({ teamNum: 3, dateNum: 10, unit: 'day' });
  const handleOk = () => {
    setModalVisible(true);
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: 'test',
      },
    }).then((res) => {
      history.push({ pathname: `/painting/${res.data.data.canvas_id}`, state: kanban });
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  function onChangeTeamNum(value: number) {
    setKanban({ ...kanban, teamNum: value });
  }
  function onChangeDateNum(value: number) {
    setKanban({ ...kanban, dateNum: value });
  }
  const createPainting = () => {
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: 'test',
      },
    }).then((res) => {
      history.push(`/painting/${res.data.data.canvas_id}`);
    });
  };
  const goToKanban = () => {
    setModalVisible(true);
  };
  return (
    <>
      <div className="dashboard">
        <div className="header">
          <div className="avatar">
            <Icon iconName="UserFollowed" />
          </div>
        </div>
        <div className="body">
          <div className="menu">
            <div className="choose_template" />
            <div className="choose_storage" />
          </div>
          <div className="right_body">
            <div className="text1">choose a template</div>
            <div className="template">
              <div className="temp">
                <Icon iconName="Color" onClick={() => { createPainting(); }} />
              </div>
              <div className="temp">
                <Icon iconName="CalendarDay" onClick={() => { goToKanban(); }} />
              </div>
            </div>
          </div>
        </div>
        <Modal title="Basic Modal" visible={modalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div>
            <>Input the total number of teams:</>
            <InputNumber min={2} max={20} value={kanban.teamNum} onChange={onChangeTeamNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
          </div>
          <div>
            <>Input the total number of dates:</>
            <InputNumber min={5} max={50} value={kanban.dateNum} onChange={onChangeDateNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
