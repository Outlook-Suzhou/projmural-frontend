import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/login/login';
import Painting from './pages/painting/painting';
import Dashboard from './pages/dashboard/dashboard';
import { StoreProvider } from './store/store';
import 'antd/dist/antd.css';

const App: React.FC<{}> = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/kanban">
        kanban
      </Route>
      <Route path="/painting">
        <StoreProvider>
          <Painting />
        </StoreProvider>
      </Route>
      <Route path="/">
        <Login />
      </Route>
    </Switch>
  </Router>
);

export default App;
