import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import {
  InputNumber, Modal, PageHeader, Avatar, Dropdown, Menu, Input,
} from 'antd';
import { useMsal } from '@azure/msal-react';
import axios from '../../utils/axios';
import { useStateStore } from '../../store/store';

const Dashboard: React.FC<{}> = () => {
  const state = useStateStore();
  const history = useHistory();
  const [journeyMapModalVisible, setJourneyMapModalVisible] = useState(false);
  const [kanban, setKanban] = useState({ teamNum: 3, dateNum: 10, unit: 'day' });
  const [canvaName, setCanvaName] = useState('untitle');
  const [canvaNameModalVisible, setCanvaNameModalVisible] = useState(false);
  const handleOk = () => {
    setJourneyMapModalVisible(true);
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: 'test',
        canvaName,
      },
    }).then((res) => {
      history.push({ pathname: `/painting/${res.data.data.canvas_id}`, state: kanban });
    });
  };
  function onChangeTeamNum(value: number) {
    setKanban({ ...kanban, teamNum: value });
  }
  function onChangeDateNum(value: number) {
    setKanban({ ...kanban, dateNum: value });
  }
  function canvaNameOnChange(e: any) {
    setCanvaName(e.target.defaultValue);
  }
  const createPainting = () => {
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canvaName,
      },
    }).then((res) => {
      history.push(`/painting/${res.data.data.canvas_id}`);
    });
  };
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
  const { instance } = useMsal();
  const logoutFunction = () => { instance.logoutRedirect({ postLogoutRedirectUri: '/' }); };
  const DropdownMenu = (
    <Menu>
      <Menu.Item key="1" onClick={logoutFunction}>
        logout
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <div className="dashboard">
        <PageHeader
          className="site-page-header"
          title="DashBoard"
          extra={
            [
              <div>
                <span className="avatar_name">
                  {state.userInfo.name}
                </span>
                <Dropdown overlay={DropdownMenu} trigger={['hover']}>
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: ColorList[parseInt(state.userInfo.microsoftId.substr(-1), 16) % 4],
                      verticalAlign: 'middle',
                      cursor: 'pointer',
                    }}
                  >
                    {state.userInfo.name.split(' ').pop()}
                  </Avatar>
                </Dropdown>
              </div>,
            ]
          }
        />
        <div className="body">
          <div className="menu">
            <div className="choose_template" />
            <div className="choose_storage" />
          </div>
          <div className="right_body">
            <div className="text1">
              Create new board
            </div>
            <div className="template">
              <div className="temp">
                <Icon className="icon" iconName="Color" onClick={() => { setCanvaNameModalVisible(true); }} />
                <div className="font"> new board </div>
              </div>
              <div className="temp">
                <Icon className="icon" iconName="CalendarDay" onClick={() => { setJourneyMapModalVisible(true); }} />
                <div className="font"> journey map </div>
              </div>
            </div>
            <div className="text1">
              All board
            </div>
          </div>
        </div>
        <Modal title="Please input journey map info" visible={journeyMapModalVisible} onOk={handleOk} onCancel={() => { setJourneyMapModalVisible(false); }}>
          <div>
            <>Input the total number of teams:</>
            <InputNumber min={2} max={20} value={kanban.teamNum} onChange={onChangeTeamNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
          </div>
          <div>
            <>Input the total number of dates:</>
            <InputNumber min={5} max={50} value={kanban.dateNum} onChange={onChangeDateNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
          </div>
        </Modal>
        <Modal title="Please input canva Name" visible={canvaNameModalVisible} onOk={createPainting} onCancel={() => { setCanvaNameModalVisible(false); }}>
          <Input onChange={canvaNameOnChange} />
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
