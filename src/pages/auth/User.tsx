import React from 'react';
import { useLocation } from 'react-router-dom';
import { SIGNIN_DATA, SIGNUP_DATA } from 'constant/auth.constant';
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
