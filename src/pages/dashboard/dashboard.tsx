import './dashboard.scss';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';
import axios from '../../utils/axios';

const Dashboard: React.FC<{}> = () => {
  const history = useHistory();
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
    history.push('/kanban');
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
      </div>
    </>
  );
};
export default Dashboard;
