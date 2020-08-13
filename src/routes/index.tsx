import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from 'pages/home';

const Root: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />

      <Redirect path="*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Root;
