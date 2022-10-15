import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { API } from '../../config';

const Auth = ({ isSelectSignUp, contents }) => {
  const { title, buttonText, toGobutton } = contents;
  const navigate = useNavigate();

  const goToSignUp = e => {
    navigate('/signup');
  };
  const goToSignIn = e => {
    navigate('/');
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
      alert('로그인 되었습니다');
    }
  });

  const [info, setInfo] = useState({
    userId: '',
    userPassword: '',
  });

  const onChangeinfo = e => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const passed = info.userId.includes('@') && info.userPassword.length >= 8;

  const config = {
    email: info.userId,
    password: info.userPassword,
  };

  const toSignIn = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API.SignIn}`, config);
      if (res.status === 200) {
        alert('로그인 성공');
        navigate('/todo');
        const { access_token } = res.data;
        localStorage.setItem('token', access_token);
      }
    } catch {
      alert('로그인에 실패했습니다');
    }
  };

  const toSignUp = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API.SignUp}`, config);
      if (res.status === 201) {
        alert('회원가입 성공');
        navigate('/');
      }
    } catch {
      alert('회원가입에 실패했습니다');
    }
  };

  return (
    <Layout>
      <BackgroundColor>
        <LayoutCenter>
          <LoginBox>
            <LoginText>{title}</LoginText>
            <LoginForm>
              <LoginId
                type="text"
                placeholder=" 이메일을 입력해주세요"
                name="userId"
                value={info.userId}
                onChange={onChangeinfo}
              />
              <LoginPassword
                type="password"
                placeholder=" 8자 이상 비밀 번호를 입력해주세요"
                name="userPassword"
                value={info.userPassword}
                onChange={onChangeinfo}
              />
              <LoginButton
                disabled={!passed}
                onClick={isSelectSignUp ? toSignUp : toSignIn}
              >
                {buttonText}
              </LoginButton>
              <ToGoButton onClick={isSelectSignUp ? goToSignIn : goToSignUp}>
                {toGobutton}
              </ToGoButton>
            </LoginForm>
          </LoginBox>
        </LayoutCenter>
      </BackgroundColor>
    </Layout>
  );
};

export default Auth;

const Layout = styled.div`
  width: 1440px;
  height: 100%;
`;

const BackgroundColor = styled.div`
  width: 100%;
  height: 100%;
  background-color: bisque;
`;

const LayoutCenter = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginBox = styled.div`
  width: 500px;
  height: auto;
  border: 1px #ababab solid;
  border-radius: 17px;
  &:hover {
    box-shadow: 1px 1px 20px #ddd;
  }
`;

const LoginText = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin: 140px 0 0 72px;
`;

const LoginForm = styled.form`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 70px 30px;
`;

const LoginId = styled.input`
  width: 350px;
  height: 40px;
  border: solid 1px #cccccc;
  border-radius: 5px;
`;

const LoginPassword = styled.input`
  width: 350px;
  height: 40px;
  border: solid 1px #cccccc;
  border-radius: 5px;
`;
const LoginButton = styled.button`
  width: 350px;
  height: 40px;
  background-color: #2087c9;
  color: #ffffff;
  border: none;
  border-radius: 5.5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;

const ToGoButton = styled.button`
  width: 350px;
  height: 40px;
  background-color: #2087c9;
  color: #ffffff;
  border: none;
  border-radius: 5.5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
