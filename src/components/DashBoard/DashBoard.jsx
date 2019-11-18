import React from 'react'
import {
  Layout,
  //Menu, Icon 
} from 'antd'
//import { Link } from 'react-router-dom'
import './DashBoard.css';

class DashBoard extends React.Component {
  render() {
    const { Content, Header } = Layout;
    return (
      <Layout className="dashboard">
        <Layout>
          <Header>
            <div className="logo">Logo</div>
          </Header>
          <Content>
            <div className="content">
              <h1>Hello</h1>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DashBoard;