import React from 'react'
import { Layout, } from 'antd'
import HomeEmpty from './HomeEmpty'
import logo from './420logo.png';
import './css/DashBoard.css';
import { accountActions } from '../actions'
import { connect } from 'react-redux'

class DashBoard extends React.Component {
  state = {
    "loggedIn": false,
    "user": {}
  }

  constructor(props) {
    super(props)
    this.checkSession = this.checkSession.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }
  checkSession() {
    const { dispatch } = this.props;
    dispatch(accountActions.checkSession())
  }
  logoutUser() {
    const { dispatch } = this.props
    dispatch(accountActions.logout)
    this.props.history.push('/login')
  }

  render() {
    const { authentication } = this.props
    const { Content, Header } = Layout;
    const user = authentication.user
    return (
      <Layout className="dashboard">
          <Header>
            <div className="logo"><img src={logo} height={48} alt="420"/></div>
          </Header>
          <Content>
            <HomeEmpty 
              loggedIn={authentication.loggedIn} 
              checkSessionClick={this.checkSession}
              logoutClick={this.logoutUser}
              userName={user ? user.fullname : 'none'} 
            />
          </Content>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state
  return { authentication }
}

export default connect(mapStateToProps)(DashBoard);
