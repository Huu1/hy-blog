import { Button } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import './index.scss';

const Login = () => {
  const signupBtn: any = useRef(null);
  const loginBtn: any = useRef(null);

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

  return (
    <div className='form-structor'>
      <div className='signup'>
        <h2 className='form-title' ref={signupBtn} id='signup'>
          <span>or</span>Sign up
        </h2>
        <div className='form-holder'>
          <input type='text' className='input' placeholder='Name' />
          <input type='email' className='input' placeholder='Email' />
          <input type='password' className='input' placeholder='Password' />
        </div>
        <button type='button' className='submit-btn'>
          Sign up
        </button>
      </div>
      <div className='login slide-up'>
        <div className='center'>
          <h2 className='form-title' ref={loginBtn} id='login'>
            <span>or</span>Log in
          </h2>
          <div className='form-holder'>
            <input type='email' className='input' placeholder='Email' />
            <input type='password' className='input' placeholder='Password' />
          </div>
          {/* <button type='button' className='submit-btn'>
            Log in
          </button> */}
          <Button> login</Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
