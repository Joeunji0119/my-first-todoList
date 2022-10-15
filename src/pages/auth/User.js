import React from 'react';
import { useLocation } from 'react-router-dom';
import Auth from './Auth';

const User = () => {
  const location = useLocation();
  const currentURL = location.pathname;
  const isSelectSignUp = currentURL === '/signup';

  return (
    <Auth
      contents={isSelectSignUp ? SIGNUP_DATA : SIGNIN_DATA}
      isSelectSignUp={isSelectSignUp}
    />
  );
};

export default User;

const SIGNIN_DATA = {
  title: '로그인',
  buttonText: '로그인하기',
  toGobutton: '회원가입하기',
  url: '/',
};
const SIGNUP_DATA = {
  title: '회원가입',
  buttonText: '회원가입하기',
  toGobutton: '로그인하기',
  url: '/signup',
};
