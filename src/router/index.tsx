import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from 'Src/router/Layout/Main';
import Login from 'Src/components/Dialog';
import { getToken } from 'Src/utils';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoginVisible,
  getSideDrawerVisible,
  toggleLoginVisible,
  toggleSideDrawerVisible,
} from 'Src/store/feature/appSlice';
import MainWrap from './Layout/Main/main';
import AppMenu from './Layout/SideBar';

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

const Content = () => {
  const drawerVisible = useSelector(getSideDrawerVisible);
  const loginVisible = useSelector(getLoginVisible);
  const dispatch = useDispatch();
  return (
    <div className='app flex-column' style={{ minHeight: '100vh' }}>
      <MainWrap>
        <Main />
      </MainWrap>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='left'
        open={drawerVisible}
        onClose={() => dispatch(toggleSideDrawerVisible())}
        onOpen={() => dispatch(toggleSideDrawerVisible())}
      >
        <AppMenu />
      </SwipeableDrawer>
      <Login open={loginVisible} onCloseHandle={() => dispatch(toggleLoginVisible())} />
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
