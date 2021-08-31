import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DatePicker, Menu, Dropdown, Pagination,
  InputNumber, Modal, Select, PageHeader, Input,
} from 'antd';
import axios from '../../utils/axios';
import { useStateStore } from '../../store/store';
import AvatarArea from '../../components/login_page/avatar_area';

const Dashboard: React.FC<{}> = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const state = useStateStore();
  const history = useHistory();
  const [kanban, setKanban] = useState({
    teamNum: 3, start: '1', end: '1', unit: 'day', isFirst: true,
  });
  const size = ['month', 'week', 'day'];
  const [journeyMapModalVisible, setJourneyMapModalVisible] = useState(false);
  const [canvaName, setCanvaName] = useState('untitle');
  const [canvaNameModalVisible, setCanvaNameModalVisible] = useState(false);
  const handleOk = () => {
    setJourneyMapModalVisible(true);
    console.log(canvaName);
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canva_name: canvaName,
      },
    }).then((res) => {
      history.push({ pathname: `/painting/${res.data.data.canvas_id}`, state: { kanban, id: `${res.data.data.canvas_id}` } });
    });
  };
  function onChangeTeamNum(value: number) {
    setKanban({ ...kanban, teamNum: value });
  }
  function onChangeSize(value: string) {
    setKanban({ ...kanban, unit: value });
  }
  function onChangeDate(date: any) {
    setKanban({ ...kanban, start: date[0].format(), end: date[1].format() });
    console.log(kanban);
  }
  function canvaNameOnChange(e: any) {
    setCanvaName(e.target.value);
  }
  const createPainting = () => {
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canva_name: canvaName,
      },
    }).then((res) => {
      if (res.data.retc !== 0) {
        console.log(res);
        return;
      }
      history.push(`/painting/${res.data.data.canvas_id}`);
    }).catch((e) => {
      console.log(e);
    });
  };

  // divide boards into separate pages
  // eslint-disable-next-line no-unused-vars
  const [pageMinValue, setPageMinValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageMaxValue, setPageMaxValue] = useState(5);
  const handlePageChange = (val: number) => {
    if (val <= 1) {
      setPageMinValue(0);
      setPageMaxValue(5);
    } else {
      setPageMinValue((val - 1) * 5);
      setPageMaxValue((val - 1) * 5 + 5);
    }
  };

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
                <AvatarArea />
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
              <div className="temp" onClick={() => { setCanvaNameModalVisible(true); }} aria-hidden="true">
                <div className="template-image-paint" />
                <div className="font"> + new canvas </div>
              </div>
              <div className="temp" onClick={() => { setJourneyMapModalVisible(true); }} aria-hidden="true">
                <div className="template-image-calender" />
                <div className="font"> + new Kanban </div>
              </div>
            </div>
            <div className="text1">
              History Boards
            </div>
            <div className="template">
              {
                state.userInfo.canvas.slice(pageMinValue, pageMaxValue).map((val, ind) => {
                  const canvaDropdown = (
                    <Menu>
                      <Menu.Item onClick={
                        (e: any) => {
                          console.log('delete ', val);
                          e.stopPropagation();
                        }
                      }
                      >
                        delete
                      </Menu.Item>
                      <Menu.Item>
                        copy link
                      </Menu.Item>
                    </Menu>
                  );
                  if (ind >= 10) {
                    return (<div />);
                  }
                  return (
                    <>
                      <div className="history" onClick={() => { history.push(`/painting/${val.id}`); }} aria-hidden="true">
                        <Dropdown overlay={canvaDropdown}>
                          <div className="setting" onClick={() => { console.log('setting.'); }} aria-hidden="true"> ··· &nbsp;  </div>
                        </Dropdown>
                        <div className="template-image-canvas" />
                        <div className="font">
                          {val.name}
                        </div>
                      </div>
                    </>
                  );
                })
              }
            </div>
            <div className="page">
              <br />
              <Pagination
                defaultCurrent={1}
                defaultPageSize={5}
                onChange={handlePageChange}
                total={state.userInfo.canvas.length}
              />
            </div>
          </div>
        </div>
        <Modal title="Please input kanban info" visible={journeyMapModalVisible} onOk={handleOk} onCancel={() => { setJourneyMapModalVisible(false); }}>
          <div>
            <>Input the total number of teams:</>
            <InputNumber min={2} max={20} value={kanban.teamNum} onChange={onChangeTeamNum} style={{ height: '35px', margin: '15px', width: '50px' }} />
          </div>
          <div>
            <>Input the the start-stop time of the project: </>
            <Select defaultValue="day" style={{ width: 120 }} onChange={onChangeSize}>
              {size.map((unit) => (
                <Option value={unit}>{unit}</Option>
              ))}
            </Select>
            {/* @ts-ignore */}
            <RangePicker picker={kanban.unit} onChange={onChangeDate} style={{ marginTop: '20px' }} />
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
