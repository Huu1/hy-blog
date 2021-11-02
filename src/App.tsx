import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';
import store from './store';
import 'dayjs/locale/zh-cn';
import './assets/iconfont/iconfont.scss';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}
export default App;
