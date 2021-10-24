import React from 'react';
import DocumentTitle from 'react-document-title';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import menuList from 'Src/config/menu';
import router from 'Src/config/router';
import { getMenuItemInMenuListByProperty } from 'Src/utils';

const getPageTitle = (data: any[], pathname: any): string => {
  let title = 'hy的博客';
  const item = getMenuItemInMenuListByProperty(data, 'path', pathname);
  if (item) {
    title = `${item.title} - hy的博客`;
  }
  return title;
};

function Main(props: any) {
  const {
    location: { pathname },
  } = props;

  const main = (): React.ReactChild => {
    return (
      <TransitionGroup>
        <CSSTransition key={pathname} timeout={500} classNames='fade' exit={false}>
          <Switch location={props.location}>
            <Redirect exact from='/' to='/home' />
            {router.map((route) => {
              return <Route component={route.component} key={route.path} path={route.path} />;
            })}
            <Redirect to='/error/404' />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );
  };

  return <DocumentTitle title={getPageTitle(menuList, pathname)}>{main()}</DocumentTitle>;
}

export default withRouter(Main);
