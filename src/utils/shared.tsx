import useScrollTrigger from '@material-ui/core/useScrollTrigger/useScrollTrigger';
import React from 'react';
import Slide from '@material-ui/core/Slide';

export interface Props {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
  children: React.ReactElement;
}

export function HideOnScroll(props: any) {
  const { children } = props;
  const trigger = useScrollTrigger({
    target: window,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}
