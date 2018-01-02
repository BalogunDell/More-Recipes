import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Homepage from '../Components/Pages/Homepage';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import PageNotFound from '../Components/PageNotFound/PageNotFound';
import UserPages from '../Components/Pages/UserPages';

/**
 * @class App
 *
 * @classdesc route
 *
 */
export default class App extends Component {
  render() { // eslint-disable-line
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route path="/user" component={UserPages} />
            <Route path="*"component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}
