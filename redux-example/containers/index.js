import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from '../reducers'
import App from '../components/app'

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

let store = createStore(todoApp, initState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('../components/app', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById('root')
    )
  })
}
