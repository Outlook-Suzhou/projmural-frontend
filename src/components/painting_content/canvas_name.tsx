import React from 'react';
import { Divider, Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';
import getCurrentDoc from '../../client/client';
import './canvas_name.scss';

const doc = getCurrentDoc();
const CanvasName = () => {
  const history = useHistory();
  return (
    <div className="name">
      <Tooltip title="go to dashboard">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <p
          className="p1"
          style={{
            fontWeight: 'bold',
          }}
          onClick={() => { history.push('/dashboard'); }}
        >
          projMural
        </p>
      </Tooltip>
      <Divider type="vertical" style={{ fontSize: '50px' }} />
      <p className="p2">
        {doc.value.data.canvaName}
      </p>
    </div>
  );
};
export default CanvasName;
