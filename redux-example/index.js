import { createStore } from 'redux'
import todoApp from './reducers'

const initState = {
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true,
    },
    {
      text: 'Keep all state in a single tree',
      completed: false,
    },
  ],
}

const store = createStore(todoApp, initState)
export default store
