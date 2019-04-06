import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import RootComponent from './components/RootComponent'
import * as serviceWorker from './serviceWorker';

import axios from 'axios'
import store from './store'
import { LOGIN_URL, API_URL } from './constants/constants';

axios.interceptors.request.use(
  config => {
    if (!config.url.match(LOGIN_URL) && config.url.startsWith(API_URL) && localStorage.getItem('TOKEN')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('TOKEN')}`;
    }
    return config
  }
)


ReactDOM.render(
  <Provider store={store}>
    <RootComponent />
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
