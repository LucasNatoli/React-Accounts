import React from 'react'
import { Button, Empty } from 'antd'
import './HomeEmpty.css'

const HomeEmpty = ({ loggedIn, userName, checkSessionClick }) => (
  <Empty
    image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
    imageStyle={{
      height: 92,
    }}
    className="home-empty"
    description={
      <span>
        Customize <a href="#API">{userName}</a>
      </span>
    }
  >
    {!loggedIn ? <div>
      <Button type="secondary" href="/register">Register</Button>
      <Button type="primary" href="/login">LogIn</Button>
    </div> : ''}
    {loggedIn ? <div>
      <Button type="secondary" href="/logout">LogOut</Button>
      <Button type="secondary" onClick={checkSessionClick}>CheckSession</Button>
    </div> : ''}
  </Empty>
)
/* 
HomeEmpty.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
} */

export default HomeEmpty