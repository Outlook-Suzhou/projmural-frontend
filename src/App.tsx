import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Login from './pages/login/login';
// import Painting from './pages/painting/painting';
// import Dashboard from './pages/dashboard/dashboard';
// import { StoreProvider } from './store/store';
import 'antd/dist/antd.css';

const Login = lazy(() => import('./pages/login/login'));
const Painting = lazy(() => import('./pages/painting/painting'));
const Dashboard = lazy(() => import('./pages/dashboard/dashboard'));

const App: React.FC<{}> = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/kanban">
          kanban
        </Route>
        <Route path="/painting" component={Painting} />
        <Route path="/" component={Login} />
      </Switch>
    </Suspense>
  </Router>
);

export default App;
