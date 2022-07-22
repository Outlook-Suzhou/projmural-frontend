import React, { useEffect, useMemo, useState } from 'react';
import 'antd/dist/antd.css';
import { useLocation } from 'react-router';
import { useDispatchStore, useStateStore } from '../../store/store';
import { getQueryByIds } from '../../client/client';
import axios from '../../utils/axios';
import AggTabs from './agg_tabs';

const AggContainer: React.FC<{}> = () => {
  const [isHistory] = useState(
    () => window.location.pathname.substring(window.location.pathname.length - 7) === 'history',
  );
  const globalState = useStateStore();
  const dispatch = useDispatchStore();
  const location = useLocation();
  const [docs, setDocs] = useState([]);
  const [filterDocs, setFilterDocs] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const changeHistory = useMemo(() => (newActiveKey: string) => {
    axios.post('/api/doc', {
      type: 'add_history',
      data: {
        microsoft_id: globalState.userInfo.microsoftId,
        canvas_id: newActiveKey,
      },
    }).then((res: any) => {
      console.log(res);
      dispatch({
        type: 'setUserInfo',
        payload: {
          ...globalState.userInfo,
          recentCanvas: (res.data.data.new_list || []).map((val: any) => ({
            id: val.id,
            name: val.name,
            recentOpen: val.recent_open,
          })),
        },
      });
    });
  }, [globalState, dispatch]);

  useEffect(() => {
    const canvasArray = (isHistory ? globalState.userInfo.recentCanvas : globalState.userInfo.canvas);
    const canvasIds = canvasArray.map((canvasInfo) => canvasInfo.id);
    const query = getQueryByIds(canvasIds);
    query.on('ready', () => {
      let retDocs = query.results;
      retDocs.sort((doc1: any, doc2: any) => canvasIds.indexOf(doc1.id) - canvasIds.indexOf(doc2.id));
      console.log('sort----');
      console.log(canvasArray);
      console.log(retDocs.map((doc1: any) => doc1.data.canvaName));
      retDocs = retDocs.map((retdoc: any, index: number) => ({
        value: retdoc,
        recentOpen: canvasArray[index].recentOpen,
      }));
      setDocs(retDocs);
      setFilterDocs(retDocs);
      const search = new URLSearchParams(location.search);
      const id = search.get('id') || '1';
      setActiveKey(id);
      changeHistory(id);
    });
  }, []);

  const onTabChange = useMemo(() => (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    dispatch({
      type: 'setCurrentIndex',
      payload: -1,
    });
    dispatch({
      type: 'setCurrentItem',
      payload: {},
    });
    dispatch({
      type: 'setCurrentDoc',
      payload: filterDocs.find((element: any) => element.value.id === newActiveKey),
    });
    changeHistory(newActiveKey);
  }, [globalState, dispatch, docs, changeHistory]);

  const onSearch = useMemo(() => (e: any) => {
    const reg = new RegExp(e.target.value, 'i');
    const filtered = docs.filter((doc: any) => reg.test(doc.value.data.canvaName));
    setFilterDocs(filtered);
  }, [docs]);

  return (
    <AggTabs docsArray={filterDocs} onTabChange={onTabChange} onSearch={onSearch} activeKey={activeKey} />
  );
};

export default AggContainer;
