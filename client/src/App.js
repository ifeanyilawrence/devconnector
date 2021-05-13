import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';
import { Login } from './components/auth/Login';
import Register from './components/auth/Register';
import { Landing } from './components/layout/Landing';
import { Navbar } from './components/layout/Navbar';
import store from './store';
import Alert from './components/layout/Alert';
import setAuthToken from './util/setAuthToken';
import * as actions from './store/actions';

const token = localStorage.getItem('token');
if (token) {
  setAuthToken(token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(actions.loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
