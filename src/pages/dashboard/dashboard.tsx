import './dashboard.scss';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DatePicker, Menu, Dropdown, Pagination,
  InputNumber, Modal, Select, PageHeader, Input,
  message,
} from 'antd';
import copy from 'copy-to-clipboard';
import axios from '../../utils/axios';
import { useDispatchStore, useStateStore } from '../../store/store';
import AvatarArea from '../../components/avatar/avatar_self';
import { getDocById } from '../../client/client';
import Text from '../../components/input/dashboard_content_title'

const Dashboard: React.FC<{}> = () => {
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  const state = useStateStore();
  const dispatch = useDispatchStore();
  const history = useHistory();
  const [kanban, setKanban] = useState({
    teamNum: 3, start: '1', end: '1', unit: 'day', isFirst: true,
  });
  const size = ['month', 'week', 'day'];
  const [journeyMapModalVisible, setJourneyMapModalVisible] = useState(false);
  const [canvaName, setCanvaName] = useState('untitle');
  const [url, setUrl] = useState('');
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
  function urlOnChange(e: any) {
    setUrl(e.target.value);
  }
  const duplicatePainting = (oldUrl: String, autoJump: Boolean) => {
    console.log(oldUrl, oldUrl.substring(oldUrl.length - 8));
    axios.post('/api/doc', {
      type: 'duplicate',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canva_name: canvaName,
        old_Id: oldUrl.substring(oldUrl.length - 8),
      },
    }).then((res) => {
      // console.log(res.data);
      // console.log(res.data.retc, res.data.data);
      if (res.data.retc !== 0) {
        console.log(res);
        return;
      }
      if (autoJump) history.push(`/painting/${res.data.data.canvas_id}`);
    }).catch((e) => {
      console.log(e);
    });
  };
  const createPainting = () => {
    if (!url) {
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
    } else {
      duplicatePainting(url, true);
    }
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
              <div className="avatarArea">
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
              Create a new board
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
                          e.domEvent.stopPropagation();
                          const newUserInfo = { ...state.userInfo };
                          newUserInfo.canvas.splice(ind, 1);
                          axios.post('/api/user', {
                            type: 'update',
                            data: {
                              microsoft_id: newUserInfo.microsoftId,
                              ...newUserInfo,
                            },
                          }).then((rsp) => {
                            if (rsp.data.retc === 0) {
                              dispatch({ type: 'setUserInfo', payload: newUserInfo });
                            } else {
                              console.log(rsp);
                            }
                          }).catch((err) => {
                            console.log(err);
                          });
                        }
                      }
                      >
                        delete
                      </Menu.Item>
                      <Menu.Item onClick={
                        (e) => {
                          // console.log('Id', state.userInfo.microsoftId)
                          e.domEvent.stopPropagation();
                          let uri = 'localhost:5000';
                          if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          copy(`${uri}/painting/${val.id}`);
                          message.success('url copied!');
                        }
                     }>
                        copy link
                      </Menu.Item>
                      <Menu.Item onClick={
                        (e) => {
                          e.domEvent.stopPropagation();
                          // let uri = 'localhost:5000';
                          // if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          // copy(`${uri}/painting/${val.id}`);
                          duplicatePainting(val.id, true);
                          message.success('Duplicate!');
                        }
                     }>
                        duplicate
                      </Menu.Item>
                      <Menu.Item onClick={
                        (e) => {
                          e.domEvent.stopPropagation();
                          // let uri = 'localhost:5000';
                          // if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          // copy(`${uri}/painting/${val.id}`);
                          duplicatePainting(val.id, true);
                          message.success('Duplicate!');
                        }
                     }>
                        rename
                      </Menu.Item>
                    </Menu>
                  );
                  if (ind >= 10) {
                    return (<div />);
                  }
                  return (
                    <>
                      <div className="history">
                        <Dropdown overlay={canvaDropdown}>
                          <div className="setting" aria-hidden="true">
                            <p>···&nbsp;</p>
                          </div>
                        </Dropdown>
                        <div
                          className="template-image-canvas"
                          onClick={() => {
                            history.push(`/painting/${val.id}`);
                          }}
                          aria-hidden="true"
                        />
                        <div className="font">
                          <Text doc={getDocById(val.id)} className='dashCanvasName' currentCanvas={val}/>
                          {/* {val.name} */}
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
            <>Input the name of canvas:</>
            <Input onChange={canvaNameOnChange} />
          </div>
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
            <RangePicker picker={kanban.unit === 'week' ? 'date' : kanban.unit} onChange={onChangeDate} style={{ marginTop: '20px' }} />
          </div>
        </Modal>
        <Modal title="Please input canvas Info" visible={canvaNameModalVisible} onOk={createPainting} onCancel={() => { setCanvaNameModalVisible(false); }}>
          <div>
            <>Input the name of canvas:</>
            <Input onChange={canvaNameOnChange} />
          </div>
          <div>
            <>Input the url if you want to duplicate a canva</>
            <Input onChange={urlOnChange} />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
