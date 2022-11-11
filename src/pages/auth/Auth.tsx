import React from 'react';
import styled from 'styled-components';
import { TypeAuth } from '../../constant/auth.constant';
import useAuth from './Auth.hook';

interface Props {
  contents: TypeAuth;
  isSelectSignUp: boolean;
}

const Auth = ({ contents, isSelectSignUp }: Props) => {
  const { title, buttonText, toGobutton } = contents;
  const { info, passed, toAuth, onChangeinfo, signModeHandler } = useAuth();

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
                onClick={e => toAuth(e, isSelectSignUp)}
              >
                {buttonText}
              </LoginButton>
              <ToGoButton onClick={e => signModeHandler(e, isSelectSignUp)}>
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
  ${props => props.theme.variables.absoluteCenter}
`;

const LoginBox = styled.div`
  width: 500px;
  height: auto;
  ${props => props.theme.variables.backGroundHover}
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
  background-color: ${props => props.theme.style.mainBlue};
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
  background-color: ${props => props.theme.style.mainBlue};
  color: #ffffff;
  border: none;
  border-radius: 5.5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;
