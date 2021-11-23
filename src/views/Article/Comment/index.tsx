import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CommentList from 'Src/components/ReplayList';
import request from 'Src/utils/request';

const drawerBleeding = 32;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // eslint-disable-next-line react/require-default-props
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer(props: any) {
  const { window, onCommentHandle, articleId } = props;

  const [commentList, setComment] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    if (open) {
      const fetch = async () => {
        try {
          const res: any = await request.get(`comment/${articleId}`);
          const { code, data, msg } = res;
          if (code === 0) {
            setTimeout(() => {
              setComment(data);
            }, 100);
          } else {
            console.warn(msg);
          }
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
      setLoading(true);
      fetch();
    } else {
      setComment([]);
    }
  }, [open, articleId]);

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(80% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>查看评论</Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor='bottom'
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: false,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding - 5,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
            zIndex: 9,
          }}
        >
          <Puller />
          <Typography sx={{ p: 1, color: 'text.secondary' }}>共{commentList.length} 条评论</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            height: '100%',
            overflow: 'auto',
            bgcolor: '#dee1e3',
          }}
        >
          {loading && (
            <div style={{ padding: '1rem' }}>
              <Skeleton />
              <Skeleton animation='wave' />
              <Skeleton animation='wave' />
              <Skeleton animation={false} />
            </div>
          )}
          {!loading && commentList && commentList.length === 0 && (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>暂无评论</div>
          )}
          <CommentList data={commentList} onCommentHandle={onCommentHandle} />
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
