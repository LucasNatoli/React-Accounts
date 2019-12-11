import React from 'react'
import { Button, Empty } from 'antd'
import './css/HomeEmpty.css'

const HomeEmpty = ({ loggedIn, userName}) => (
  <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    imageStyle={{
      height: 92,
    }}
    className="home-empty"
    description={loggedIn ?
      <span>You are <a href="user-account">{userName}</a></span> :
      <span>I don't know you</span>
    }
  >
    {!loggedIn ? <div>
      <Button type="secondary" href="/register">Register</Button>
      <Button type="primary" href="/login">Log In</Button>
    </div> : ''}
  </Empty>
)

export default HomeEmpty