import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/login/login';
import Painting from './pages/painting/painting';
import { StoreProvider } from './store/store';
import 'antd/dist/antd.css';

const App: React.FC<{}> = () => (
  <Router>
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/dashboard">
        dashboard
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
