import { Alert, Button, Snackbar } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { setUser } from 'Src/store/feature/appSlice';
import { setToken } from 'Src/utils';
import request from 'Src/utils/request';
import './index.scss';

const Login = (props: any) => {
  const signupBtn: any = useRef(null);
  const loginBtn: any = useRef(null);

  const usernamRef: any = useRef(null);
  const passwordRef: any = useRef(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string>('');

  const dispatch = useDispatch();

  useEffect(() => {
    loginBtn.current.addEventListener('click', (e: any) => {
      const parent: any = e.target.parentNode.parentNode;
      // eslint-disable-next-line array-callback-return
      [...e.target.parentNode.parentNode.classList].find((element: any): any => {
        if (element !== 'slide-up') {
          parent.classList.add('slide-up');
        } else {
          signupBtn.current.parentNode.classList.add('slide-up');
          parent.classList.remove('slide-up');
        }
      });
    });
    signupBtn.current.addEventListener('click', (e: any) => {
      const parent = e.target.parentNode;
      // eslint-disable-next-line array-callback-return
      [...e.target.parentNode.classList].find((element): any => {
        if (element !== 'slide-up') {
          parent.classList.add('slide-up');
        } else {
          loginBtn.current.parentNode.parentNode.classList.add('slide-up');
          parent.classList.remove('slide-up');
        }
      });
    });
  }, []);

  const LoginSubmit = async () => {
    const username = usernamRef.current.value;
    const password = passwordRef.current.value;
    const param = { username, password };
    try {
      const { code, msg, data }: any = await request.post('/auth/login', param);
      setOpen(true);
      if (code === 0) {
        setMessage('登录成功');
        dispatch(setUser(data?.user));
        setToken(data?.token);
        props.history.push('/');
      } else {
        setMessage(msg);
      }
    } catch (error) {
      console.log(error);
      setMessage('未知错误');
    }
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  return (
    <div className='form-structor'>
      <div className='signup'>
        <h2 className='form-title' ref={signupBtn} id='signup'>
          <span>or</span>Sign Up
        </h2>
        <div className='form-holder'>
          <input type='text' className='input' placeholder='Name' />
          <input type='email' className='input' placeholder='Email' />
          <input type='password' className='input' placeholder='Password' />
        </div>
        <Button variant='outlined' style={{ width: '100%', marginTop: '1em' }}>
          注册
        </Button>
      </div>
      <div className='login slide-up'>
        <div className='center'>
          <h2 className='form-title' ref={loginBtn} id='login'>
            <span>or</span>Log in
          </h2>
          <div className='form-holder'>
            <input type='email' className='input' placeholder='Email' ref={usernamRef} />
            <input type='password' className='input' ref={passwordRef} placeholder='Password' />
          </div>
          <Button variant='outlined' style={{ width: '100%', marginTop: '1em' }} onClick={LoginSubmit}>
            登录
          </Button>
        </div>
      </div>
      <Snackbar open={open} message={message} />
    </div>
  );
};

export default React.memo(withRouter(Login));
