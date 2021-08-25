import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {
  DatePicker,
  InputNumber, Modal, Select,
} from 'antd';
import axios from '../../utils/axios';

const Dashboard: React.FC<{}> = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [kanban, setKanban] = useState({
    teamNum: 3, dateSize: 'month', start: '1', end: '1', unit: 'day', dateNum: 10,
  });
  const size = ['month', 'week', 'day'];
  const handleOk = () => {
    setModalVisible(true);
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: 'test',
      },
    }).then((res) => {
      history.push({ pathname: `/painting/${res.data.data.canvas_id}`, state: { kanban, id: `${res.data.data.canvas_id}` } });
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  function onChangeTeamNum(value: number) {
    setKanban({ ...kanban, teamNum: value });
  }
  function onChangeSize(value: string) {
    setKanban({ ...kanban, dateSize: value });
  }
  function onChangeDate(date: any, dateString: any) {
    console.log(date[1] - date[0]);
    console.log(date, dateString);
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
            <>Input the the start-stop time of the project</>
            <Select defaultValue={size[0]} style={{ width: 120 }} onChange={onChangeSize}>
              {size.map((unit) => (
                <Option value={unit}>{unit}</Option>
              ))}
            </Select>
            {/* @ts-ignore */}
            <RangePicker picker={kanban.dateSize} onChange={onChangeDate} />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
