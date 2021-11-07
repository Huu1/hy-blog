import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from 'Src/router/Layout/Header';
import Footer from 'Src/router/Layout/Footer';
import Main from 'Src/router/Layout/Main';
import Login from 'Src/router/Login';

const Content = () => {
  const isArticlePage = window.location.href.includes('article');
  return (
    <div className='app flex-column' style={{ minHeight: '100vh' }}>
      <Header />
      <main className={`${isArticlePage ? '' : 'page'} `}>
        <Main />
      </main>
      <Footer />
    </div>
  );
};

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route
          path='/login'
          render={() => {
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
