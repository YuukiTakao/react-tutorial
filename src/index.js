import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import { Game } from './components/game'
import { app } from './reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(app, composeWithDevTools(applyMiddleware()))

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);

