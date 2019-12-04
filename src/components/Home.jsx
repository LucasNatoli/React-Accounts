import React from 'react'
import { Layout, } from 'antd'
import HomeEmpty from './HomeEmpty'
import logo from './assets/420logo.png';
import './css/Home.css';
import { accountActions } from '../actions'
import { connect } from 'react-redux'

class Home extends React.Component {
  state = {
    "loggedIn": false,
    "user": {}
  }

  constructor(props) {
    super(props)
    this.checkToken = this.checkToken.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }
  checkToken() {
    const { dispatch } = this.props;
    dispatch(accountActions.checkToken())
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
      <Layout className="home">
          <Header>
            <div className="logo"><img src={logo} height={48} alt="420"/></div>
          </Header>
          <Content>
            <HomeEmpty 
              loggedIn={authentication.loggedIn} 
              checkTokenClick={this.checkToken}
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

export default connect(mapStateToProps)(Home);
