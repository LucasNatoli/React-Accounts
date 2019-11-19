import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../helpers';
import { notifyActions } from '../../actions';
import DashBoard from '../DashBoard/DashBoard';
import LoginPage from '../LoginPage/LoginPage'
import RegisterPage from '../RegisterPage/RegisterPage'
import './App.css';
import Notify from '../Notify/Notify'

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(notifyActions.clear());
    });
  }

  render() {
    const { notify } = this.props;
    if (notify && notify.message) { Notify(notify) }
    return (
      <div className="accounts-app">
        <BrowserRouter history={history}>
          <Switch>
            <Route exact path="/" component={DashBoard} page="home" />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </BrowserRouter>
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