import React, { Component } from 'react';
import { Route , HashRouter, hashHistory  } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import Chat from './components/Chat';
import { Register } from './components/Register';

import './custom.css'
import './Css/normalize.css';
import './Css/reset.css';
import './Css/style.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Layout>
            <Route exact path='/' component={Login} />
            <Route path='/Chat' component={Chat} />
              <Route path='/Login' component={Login} />
              <Route path='/Register' component={Register} />
      </Layout>
    );
  }
}
