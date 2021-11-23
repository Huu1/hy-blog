import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Input from '@material-ui/core/Input';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import LoadingButton from '@mui/lab/LoadingButton';
import request from 'Src/utils/request';
import { setToken } from 'Src/utils';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { setUser } from 'Src/store/feature/userSlice';

const ariaLabel = { 'aria-label': 'description' };

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function Login(props: any) {
  const { open, onCloseHandle } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleClose = () => {
    onCloseHandle();
  };

  const LoginSubmit = async () => {
    const param = { username, password };
    try {
      const { code, msg, data }: any = await request.post(isLogin ? '/auth/login' : '/auth/register', param);
      if (code === 0) {
        enqueueSnackbar(msg, {
          autoHideDuration: 1500,
        });
        dispatch(setUser(data?.user));
        setToken(data?.token);
        setTimeout(() => {
          handleClose();
        }, 30);
      } else {
        enqueueSnackbar(msg, {
          autoHideDuration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleClick = () => {
    setLoading(true);
    LoginSubmit();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{isLogin ? '登录' : '注册'}</DialogTitle>
      <Paper style={{ padding: '1rem 2rem' }}>
        <Box component='form' noValidate autoComplete='off'>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%' }}
            placeholder='账号'
            inputProps={ariaLabel}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', margin: '1rem 0' }}
            placeholder='密码'
            inputProps={ariaLabel}
          />
        </Box>
        <Grid container direction='row' xs={24} justifyContent='space-between' alignItems='center'>
          <Grid item>
            <span onClick={() => setIsLogin(!isLogin)}>{!isLogin ? '登录' : '注册'}</span>
          </Grid>
          <Grid item>
            <Button onClick={() => handleClose()}>取消</Button>
            <LoadingButton
              color='secondary'
              onClick={handleClick}
              loading={loading}
              loadingPosition='center'
              variant='contained'
            >
              确定
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
}

export default React.memo(Login);
