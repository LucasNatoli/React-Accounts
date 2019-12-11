import React from 'react'
import { Avatar, Layout, Popover } from 'antd'
import HomeEmpty from './HomeEmpty'
import './css/Home.css';
import { accountActions } from '../actions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  state = {
    "loggedIn": (JSON.parse(localStorage.getItem('user'))),
    "user": JSON.parse(localStorage.getItem('user'))
  }

  constructor(props) {
    super(props)
    this.checkToken = this.checkToken.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
    this.checkStatus = this.checkStatus.bind(this)
  }
  checkToken(e) {
    e.preventDefault()
    const { dispatch } = this.props;
    dispatch(accountActions.checkToken())
  }
  logoutUser(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(accountActions.logout)
    this.props.history.push('/login')
  }
  checkStatus(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(accountActions.getServerStatus())

  }
  render() {
    const { Content, Header } = Layout;
    const user = JSON.parse(localStorage.getItem('user'))
    const loggedIn = (user !== null)


    const userMenu = (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Link className="nav-text" to="/user-account" title="Profile">Your Profile</Link>
        <Link className="nav-text" to="/check-token" onClick={this.checkToken} title="check-token">Check Token</Link>
        <Link className="nav-text" to="/check-status" onClick={this.checkStatus} title="check-token">Check Status</Link>
        <Link className="nav-text" to="/logout" onClick={this.logoutUser} title="Logout">Logout</Link>
      </div>
    );

    return (
      <Layout className="home">
        <Header>
          <div className="logo" style={{ display: 'flex' }}><h1>React Accounts</h1></div>
          <div className="user-details">
            <Popover placement="bottomRight" content={userMenu} title={loggedIn ? user.fullname : '?'} trigger="click">
              <Avatar>{loggedIn ? user.fullname.charAt(0) : '?'}</Avatar>
            </Popover>
          </div>
        </Header>
        <Content>
          <HomeEmpty
            loggedIn={loggedIn}
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

export default connect(mapStateToProps)(Home);
