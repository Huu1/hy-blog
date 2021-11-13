import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'Src/router/Layout/Header';
import Footer from 'Src/router/Layout/Footer';
import Main from 'Src/router/Layout/Main';
import Login from 'Src/router/Login';
import { getToken } from 'Src/utils';
import MainWrap from './Layout/Main/main';

const Content = () => {
  // const isArticlePage = window.location.href.includes('article');
  return (
    <div className='app flex-column' style={{ minHeight: '100vh' }}>
      {/* <Header /> */}
      {/* <main className={`${isArticlePage ? '' : 'page'} `}> */}
      <MainWrap>
        <Main />
      </MainWrap>
      {/* <Footer /> */}
    </div>
  );
};

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path='/login'
          render={() => {
            if (getToken()) {
              return <Redirect to='/' />;
            }
            return <Login />;
          }}
        />
        <Route
          path='/'
          render={() => {
            return <Content />;
          }}
        />
      </Switch>
    </HashRouter>
  );
};

export default Router;
