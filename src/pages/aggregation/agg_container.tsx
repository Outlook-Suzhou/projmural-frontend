import React, { useEffect, useMemo, useState } from 'react';
import 'antd/dist/antd.css';
import { useDispatchStore, useStateStore } from '../../store/store';
import { getQueryByIds } from '../../client/client';
import AggTabs from './agg_tabs';

const AggContainer: React.FC<{}> = () => {
  const [isHistory] = useState(
    () => window.location.pathname.substring(window.location.pathname.length - 7) === 'history',
  );
  const globalState = useStateStore();
  const dispatch = useDispatchStore();
  const [docs, setDocs] = useState([]);
  const onTabChange = useMemo(() => (activeKey: string) => {
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
      payload: docs.find((element: any) => element.value.id === activeKey),
    });
  }, [docs]);

  useEffect(() => {
    console.log('path', window.location.pathname.substring(window.location.pathname.length - 7));
  }, []);
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
        name: retdoc.data.canvaName,
        recentOpen: canvasArray[index].recentOpen,
      }));
      setDocs(retDocs);
    });
  }, []);

  return (
    <AggTabs onTabChange={onTabChange} docsArray={docs} />
  );
};

export default AggContainer;
