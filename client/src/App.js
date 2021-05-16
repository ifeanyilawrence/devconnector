import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import store from './store';
import setAuthToken from './util/setAuthToken';
import * as actions from './store/actions';
import Routes from './components/routing/Routes';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(actions.loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
