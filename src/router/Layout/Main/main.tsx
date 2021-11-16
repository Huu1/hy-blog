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
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux';
import { toggleSideDrawerVisible } from 'Src/store/feature/appSlice';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBack from '@mui/icons-material/ArrowBackTwoTone';
import { HideOnScroll, Props } from 'Src/utils/shared';

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    return false;
  };

  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role='presentation' sx={{ position: 'fixed', bottom: 55, right: 30 }}>
        {children}
      </Box>
    </Zoom>
  );
}

const ToolBar = (props: { onClickHandle: () => void; isHome: boolean }) => {
  const { onClickHandle, isHome } = props;
  const onTypeClickHandle = () => {
    onClickHandle();
  };
  return (
    <Toolbar variant='dense' sx={{ mr: 2, minHeight: '38px', bgcolor: '#fff', width: '100%' }}>
      <IconButton
        onClick={onTypeClickHandle}
        size='medium'
        edge='start'
        color={`${isHome ? 'inherit' : 'default'}`}
        aria-label='open drawer'
        sx={{ mr: 2 }}
      >
        {isHome ? <MenuIcon /> : <ArrowBack />}
      </IconButton>
      <Typography
        variant='h6'
        component='div'
        sx={{ mr: 2, fontSize: '1.1rem', color: `${isHome ? 'inherit' : 'black'}` }}
      >
        🎉🎉 Blog
      </Typography>
    </Toolbar>
  );
};

const MainWrap = (props: Props | any) => {
  const {
    history,
    children,
    location: { pathname },
  } = props;

  const isHome = React.useMemo(() => {
    return !pathname.includes('article');
  }, [pathname]);

  const dispatch = useDispatch();
  const toggle = () => {
    if (isHome) {
      dispatch(toggleSideDrawerVisible());
    } else {
      history.goBack();
    }
  };

  return (
    <>
      <CssBaseline />

      {/* toolbar */}
      {isHome ? (
        <>
          <ToolBar onClickHandle={toggle} isHome />
        </>
      ) : (
        <>
          <HideOnScroll>
            <AppBar sx={{ bgcolor: 'info.main' }}>
              <ToolBar onClickHandle={toggle} isHome={false} />
            </AppBar>
          </HideOnScroll>
        </>
      )}
      <Toolbar sx={{ minHeight: '0' }} id='back-to-top-anchor' />

      {/* 内容 */}
      <Container style={{ padding: '0' }}>{children}</Container>

      {/* 返回顶部 */}
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          Top
        </Fab>
      </ScrollTop>
    </>
  );
};

export default withRouter(MainWrap);
