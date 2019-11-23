import React from 'react'
import { Layout, } from 'antd'
import HomeEmpty from './HomeEmpty'
import logo from './420logo.png';
import './DashBoard.css';
import { accountActions } from '../../actions'
import { connect } from 'react-redux'

class DashBoard extends React.Component {
  state = {
    "loggedIn": false,
    "user": {}
  }

  render() {
    const { authentication } = this.props
    const { Content, Header } = Layout;
    return (
      <Layout className="dashboard">
        <Layout>
          <Header>
            <div className="logo"><img src={logo} height={48} /></div>
          </Header>
          <Content>
            <HomeEmpty loggedIn={authentication.loggedIn} userName={authentication.user ? authentication.user.fullName : 'none'} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state
  return { authentication }
}

export default connect(mapStateToProps)(DashBoard);
