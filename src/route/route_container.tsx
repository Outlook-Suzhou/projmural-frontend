import React, { Suspense, lazy } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Spin } from 'antd';
import useCurrentLocation from '../hook/location';
// import { LoadingOutlined } from '@ant-design/icons';

const Page404 = lazy(() => import('../pages/404/Page404'));
const Login = lazy(() => import('../pages/login/login'));
const Painting = lazy(() => import('../pages/painting/painting'));
const Dashboard = lazy(() => import('../pages/dashboard/dashboard'));

// const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const RouterContainer: React.FC<{}> = () => {
  useCurrentLocation();
  return (
    <Suspense fallback={<Spin size="large" className="page_loading" />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/kanban">
          kanban
        </Route>
        <Route path="/painting" component={Painting} />
        <Route path="/404" component={Page404} />
        <Route path="/" component={Login} />
      </Switch>
    </Suspense>
  );
};

export default RouterContainer;
