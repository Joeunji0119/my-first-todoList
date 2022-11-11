export const SIGNIN_DATA = {
  title: '로그인',
  buttonText: '로그인하기',
  toGobutton: '회원가입하기',
  url: '/',
} as const;

export const SIGNUP_DATA = {
  title: '회원가입',
  buttonText: '회원가입하기',
  toGobutton: '로그인하기',
  url: '/signup',
} as const;

export interface TypeAuth {
  title: string;
  buttonText: string;
  toGobutton: string;
  url: string;
}
