import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../helpers';
import { notifyActions } from '../actions';
import Home from './Home';
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import UserAccount from './UserAccount';
import './css/App.css';
import Notify from './Notify'


class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(notifyActions.clear());
    });
  }

  componentDidUpdate() {
    const { notify } = this.props;
    if (notify && notify.message) { Notify(notify) }
  }
  
  render() {
    return (
      <div className="accounts-app">
        <Router history={ history }>
          <Switch>
            <Route exact path="/" component={Home} page="home" />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/user-account" component={UserAccount} />
          </Switch>
        </Router>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { notify } = state;
  return {
    notify
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 