import './dashboard.scss';
import React, { useCallback, useEffect, useState } from 'react';
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
import Text from '../../components/input/dashboard_content_title';
import { getQueryByIds } from '../../client/client';

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
  const [docs, setDocs] = useState([]);
  const [recentDocs, setRecentDocs] = useState([]);
  useEffect(() => {
    console.log('canvas change');
    const canvasIds = state.userInfo.canvas.map((canvasInfo) => canvasInfo.id);
    const query = getQueryByIds(canvasIds);
    query.on('ready', () => {
      let retDocs = query.results;
      retDocs.sort((doc1: any, doc2: any) => canvasIds.indexOf(doc1.id) - canvasIds.indexOf(doc2.id));
      console.log('sort----');
      console.log(state.userInfo.canvas);
      console.log(retDocs.map((doc1: any) => doc1.data.canvaName));
      retDocs = retDocs.map((retdoc: any) => ({ value: retdoc }));
      setDocs(retDocs);
    });
  }, [state.userInfo.canvas]);
  useEffect(() => {
    console.log('recent canvas change');
    const canvasIds = state.userInfo.recentCanvas.map((canvasInfo) => canvasInfo.id);
    const query = getQueryByIds(canvasIds);
    query.on('ready', () => {
      let retDocs = query.results;
      retDocs.sort((doc1: any, doc2: any) => canvasIds.indexOf(doc1.id) - canvasIds.indexOf(doc2.id));
      console.log('sort----');
      console.log(state.userInfo.recentCanvas);
      console.log(retDocs.map((doc1: any) => doc1.data.canvaName));
      retDocs = retDocs.map((retdoc: any) => ({ value: retdoc }));
      setRecentDocs(retDocs);
    });
  }, [state.userInfo.recentCanvas]);
  const handleOk = useCallback(() => {
    setJourneyMapModalVisible(true);
    axios.post('/api/doc', {
      type: 'create',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canva_name: canvaName,
      },
    }).then((res) => {
      if (res.data.retc === 0) {
        const newUserInfo = { ...state.userInfo };
        newUserInfo.canvas = [{ id: res.data.data.canvas_id, name: 'unused', recentOpen: '-1' }, ...newUserInfo.canvas];
        dispatch({ type: 'setUserInfo', payload: newUserInfo });
        history.push({ pathname: `/painting/${res.data.data.canvas_id}`, state: { kanban, id: `${res.data.data.canvas_id}` } });
      } else {
        console.log(res);
      }
    });
  }, [state.userInfo.microsoftId]);
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

  function onChangeDateState(date: any) {
    // dispatch({ type: 'setBeginTime', payload: date[0].format() });
    // dispatch({ type: 'setEndTime', payload: date[1].format() });
    state.beginTime = date[0].format('YYYY-MM');
    state.endTime = date[1].format('YYYY-MM');
    // setKanban({ ...kanban, start: date[0].format(), end: date[1].format() });
    console.log(state);
  }
  function canvaNameOnChange(e: any) {
    setCanvaName(e.target.value);
  }
  function urlOnChange(e: any) {
    setUrl(e.target.value);
  }
  const duplicatePainting = (oldUrl: String, autoJump: Boolean) => {
    axios.post('/api/doc', {
      type: 'duplicate',
      data: {
        microsoft_id: state.userInfo.microsoftId,
        canva_name: canvaName,
        old_Id: oldUrl.substring(oldUrl.length - 8),
      },
    }).then((res) => {
      if (res.data.retc !== 0) {
        console.log(res);
        return;
      }
      const newUserInfo = { ...state.userInfo };
      newUserInfo.canvas = [{ id: res.data.data.canvas_id, name: 'unused', recentOpen: '-1' }, ...newUserInfo.canvas];
      dispatch({ type: 'setUserInfo', payload: newUserInfo });
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
          begin_time: state.beginTime,
          end_time: state.endTime,
        },
      }).then((res) => {
        if (res.data.retc !== 0) {
          console.log(res);
          return;
        }
        const newUserInfo = { ...state.userInfo };
        newUserInfo.canvas = [{ id: res.data.data.canvas_id, name: 'unused', recentOpen: '-1' }, ...newUserInfo.canvas];
        dispatch({ type: 'setUserInfo', payload: newUserInfo });
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
  const [recentPageMinValue, setRecentPageMinValue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageMaxValue, setPageMaxValue] = useState(5);
  const [recentPageMaxValue, setRecentPageMaxValue] = useState(5);
  const handlePageChange = (val: number) => {
    if (val <= 1) {
      setPageMinValue(0);
      setPageMaxValue(5);
    } else {
      setPageMinValue((val - 1) * 5);
      setPageMaxValue((val - 1) * 5 + 5);
    }
  };
  const handleRecentPageChange = (val: number) => {
    if (val <= 1) {
      setRecentPageMinValue(0);
      setRecentPageMaxValue(5);
    } else {
      setRecentPageMinValue((val - 1) * 5);
      setRecentPageMaxValue((val - 1) * 5 + 5);
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
              Created Boards
            </div>
            <div className="template">
              {
                docs.slice(pageMinValue, pageMaxValue).map((val: any, ind) => {
                  const canvaDropdown = (
                    <Menu>
                      <Menu.Item onClick={
                        (e: any) => {
                          e.domEvent.stopPropagation();
                          console.log('delete---', val.value.id, val?.value?.data?.canvaName);
                          const newCanvas = [...state.userInfo.canvas];
                          newCanvas.splice(ind, 1);
                          console.log(newCanvas);
                          console.log('---');
                          axios.post('/api/user', {
                            type: 'update',
                            data: {
                              microsoft_id: state.userInfo.microsoftId,
                              ...state.userInfo,
                              canvas: newCanvas,
                            },
                          }).then((rsp) => {
                            if (rsp.data.retc === 0) {
                              dispatch({ type: 'setUserInfo', payload: { ...state.userInfo, canvas: newCanvas } });
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
                          console.log('copy canvaName', val.value.data.canvaName);
                          copy(`${uri}/painting/${val.value.id}`);
                          message.success('url copied!');
                        }
                      }
                      >
                        copy link
                      </Menu.Item>
                      <Menu.Item onClick={
                        (e) => {
                          e.domEvent.stopPropagation();
                          // let uri = 'localhost:5000';
                          // if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          // copy(`${uri}/painting/${val.value.id}`);
                          console.log('duplicate canvaName', val.value.data.canvaName);
                          duplicatePainting(val.value.id, true);
                          message.success('Duplicate!');
                        }
                      }
                      >
                        duplicate
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
                            history.push(`/painting/${val.value.id}`);
                          }}
                          aria-hidden="true"
                        />
                        <div className="font">
                          <Text className="dashCanvasName" canvasId={val.value.id} doc={val} />
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
            <div className="text1">
              History Boards
            </div>
            <div className="template">
              {
                recentDocs.slice(recentPageMinValue, recentPageMaxValue).map((val: any, ind) => {
                  const canvaDropdown = (
                    <Menu>
                      {/* <Menu.Item onClick={
                        (e: any) => {
                          e.domEvent.stopPropagation();
                          console.log('delete---', val.value.id, val?.value?.data?.canvaName);
                          const recentCanvas = [...state.userInfo.recentCanvas];
                          recentCanvas.splice(ind, 1);
                          console.log('---');
                          axios.post('/api/user', {
                            type: 'update',
                            data: {
                              ...state.userInfo,
                              recent_canvas: recentCanvas,
                              microsoft_id: state.userInfo.microsoftId,
                            },
                          }).then((rsp) => {
                            if (rsp.data.retc === 0) {
                              dispatch({ type: 'setUserInfo', payload: { ...state.userInfo, recentCanvas: [...recentCanvas] } });
                            } else {
                              console.log(rsp);
                            }
                          });
                        }
                      }
                      >
                        delete
                      </Menu.Item> */}
                      <Menu.Item onClick={
                        (e) => {
                          // console.log('Id', state.userInfo.microsoftId)
                          e.domEvent.stopPropagation();
                          let uri = 'localhost:5000';
                          if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          console.log('copy canvaName', val.value.data.canvaName);
                          copy(`${uri}/painting/${val.value.id}`);
                          message.success('url copied!');
                        }
                      }
                      >
                        copy link
                      </Menu.Item>
                      <Menu.Item onClick={
                        (e) => {
                          e.domEvent.stopPropagation();
                          // let uri = 'localhost:5000';
                          // if (process.env.REACT_APP_ENV === 'remote') { uri = 'dev.projmural2.com'; }
                          // copy(`${uri}/painting/${val.value.id}`);
                          console.log('duplicate canvaName', val.value.data.canvaName);
                          duplicatePainting(val.value.id, true);
                          message.success('Duplicate!');
                        }
                      }
                      >
                        duplicate
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
                            history.push(`/painting/${val.value.id}`);
                          }}
                          aria-hidden="true"
                        />
                        <div className="font">
                          <Text className="dashCanvasName" canvasId={val.value.id} doc={val} />
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
                onChange={handleRecentPageChange}
                total={state.userInfo.recentCanvas.length}
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
          <div>
            <>Input the the begin-end time of the project: </>
            {/* @ts-ignore */}
            <RangePicker picker="month" onChange={onChangeDateState} style={{ marginTop: '20px' }} />
          </div>
        </Modal>
      </div>
    </>
  );
};
export default Dashboard;
