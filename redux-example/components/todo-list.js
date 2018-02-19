import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

class TodoList extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
    onTodoClick: PropTypes.func.isRequired,
  }

  render() {
    const { todos, onTodoClick } = this.props
    return (
      <ul>
        {todos.map((todo, index) => (
          <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
        ))}
      </ul>
    )
  }
}

export default TodoList
