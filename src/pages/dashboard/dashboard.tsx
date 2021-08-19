import './dashboard.scss';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Icon } from '@fluentui/react/lib/Icon';

const Dashboard: React.FC<{}> = () => {
  const history = useHistory();
  const goToPainting = () => {
    history.push('/painting');
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
                <Icon iconName="Color" onClick={() => { goToPainting(); }} />
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
