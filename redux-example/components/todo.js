import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Todo extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }

  render() {
    const { onClick, text, completed } = this.props
    return (
      <li
        onClick={onClick}
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}>
        {text}
      </li>
    )
  }
}

export default Todo
