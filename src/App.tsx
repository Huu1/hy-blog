import React from 'react';
import { Redirect, Route, HashRouter } from 'react-router-dom';
import Header from 'Components/Header';
import './assets/iconfont/iconfont.scss';
import Author from './views/Author';
import Test from './views/Test';
import Home from './views/Home';
import Article from './views/Article';
import Footer from './components/Footer';

function App() {
  return (
    <div className='app'>
      <HashRouter basename='/'>
        <div className='page-wrap'>
          <Header menus={undefined} />
          <Route exact path='/home' component={Home} />
          <Route path='/author' component={Author} />
          <Route path='/est' component={Test} />
          <Route path='/article/:id' component={Article} />
          <Footer />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
