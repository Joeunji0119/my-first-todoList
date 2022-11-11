import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from 'config';
import axios from 'axios';

const useAuth = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState({
    userId: '',
    userPassword: '',
  });

  const signModeHandler = (
    e: React.FormEvent<HTMLButtonElement>,
    isSelectSignUp: boolean
  ) => {
    if (!isSelectSignUp) {
      navigate('/signup');
      return;
    }
    if (isSelectSignUp) {
      navigate('/');
    }
  };

  const onChangeinfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const passed = info.userId.includes('@') && info.userPassword.length >= 8;

  const toAuth = async (
    e: React.FormEvent<HTMLButtonElement>,
    isSelectSignUp: boolean
  ) => {
    e.preventDefault();

    const sign = isSelectSignUp ? API.SignUp : API.SignIn;

    const config = {
      email: info.userId,
      password: info.userPassword,
    };

    try {
      const { data } = await axios.post(sign, config);

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        alert('로그인 성공');
        navigate('/todo');
      }
    } catch (err) {
      alert('로그인에 실패했습니다');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, [navigate]);

  return { info, passed, toAuth, onChangeinfo, signModeHandler };
};

export default useAuth;
