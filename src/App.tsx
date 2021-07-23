import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Painting from './pages/painting/painting';

const App: React.FC<{}> = () => (
  <Router>
    <Switch>
      <Route path="/login">
        login
      </Route>
      <Route path="/dashboard">
        dashboard
      </Route>
      <Route path="/painting">
        <Painting />
      </Route>
      <Route path="/">
        login
      </Route>
    </Switch>
  </Router>
);

export default App;
