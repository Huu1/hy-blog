import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import { Icon, IconButton, Slide, SwipeableDrawer } from '@material-ui/core';
import CustomizedList from '../SideBar';

const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

interface Props {
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

export default function MainWrap(props: Props) {
  const [drawerVisible, setDrawer] = React.useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawerVisible);
  };
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar>
            <IconButton
              onClick={toggleDrawer}
              size='large'
              edge='start'
              color='inherit'
              aria-label='open drawer'
              sx={{ mr: 2 }}
            >
              {/* <MenuIcon /> */}
              <Icon>star</Icon>
            </IconButton>
            <Typography variant='h6' component='div'>
              Scroll to see button
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id='back-to-top-anchor' />
      <Container>{props.children}</Container>
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          top
        </Fab>
      </ScrollTop>

      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor='left'
        open={drawerVisible}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        {/* {list(anchor)} */}
        <CustomizedList />
      </SwipeableDrawer>
    </>
  );
}
