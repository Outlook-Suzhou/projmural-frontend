import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {
  DatePicker,
  InputNumber, message, Modal, Select,
} from 'antd';
import axios from '../../utils/axios';

const Dashboard: React.FC<{}> = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const history = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [kanban, setKanban] = useState({
    teamNum: 3, dateNum: 10, unit: 'month', start: '1', end: '1',
  });
  const size = ['month', 'week', 'day'];
  const handleOk = () => {
    if (kanban.start === '1') {
      message.warning('please input the start-stop time!');
      return;
    }
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
  function handleSizeChange(value: string) {
    setKanban({ ...kanban, unit: value });
  }
  function handleRangeChange(value: any, dateString: any) {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    setKanban({ ...kanban, start: dateString[0], end: dateString[1] });
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
            <>Input the start-stop time of the project:</>
          </div>
          <div>
            <Select defaultValue={size[0]} style={{ width: 120 }} onChange={handleSizeChange}>
              {size.map((unit) => (
                <Option key={unit} value={unit}>{unit}</Option>
              ))}
            </Select>
            {/* @ts-ignore */}
            <RangePicker picker={kanban.unit} onChange={handleRangeChange} />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
