import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import RouterContainer from './route_container';

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const RouterComponent: React.FC<{}> = () => (
  <Router>
    <RouterContainer />
  </Router>
);

export default RouterComponent;
