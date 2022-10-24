# 원티드 프리온보딩 프론트엔드 - 선발 과제

해당 저장소는 "원티드 프리온보딩 프론트엔드 코스" 선발 과제 제출용 저장소입니다.

## 프로젝트 실행 법

```
npm install
npm start
```

## 주요 기능

1. 로그인 / 회원가입
2. 할 일 등록 / 조회 / 수정 / 삭제

## 데모 영상 or 배포 링크

1. 로그인 / 회원가입

![화면 기록 2022-10-19 오후 9 01 21](https://user-images.githubusercontent.com/95282989/196692709-37c45666-4122-4003-9203-cfb5f475613a.GIF)

2. 할 일 등록 / 조회 / 수정 / 삭제

![화면 기록 2022-10-19 오후 9 01 21 2](https://user-images.githubusercontent.com/95282989/196693184-f724ebf2-2750-400b-aec0-226ee1d65593.GIF)
![화면 기록 2022-10-19 오후 9 01 21 3](https://user-images.githubusercontent.com/95282989/196692930-40aeedf2-264c-439a-beec-10ed19267d8e.GIF)


[👉 배포 링크 👈](https://joeunji0119.github.io/wanted-pre-onboarding-frontend)

## 사용 라이브러리

- React-router-dom
- Styled-Components
- axios

## 폴더 구조

```
📦page
 ┣ 📂Auth
 ┃ ┣ 📜Auth.js
 ┃ ┣ 📜User.js
 ┣ 📂Todo
 ┃ ┣ 📜Todo.js
 ┃ ┣ 📜Todos.js
```

## 에세이 
[👉 에세이 👈](https://blog.naver.com/rell_cake/222904736106)




## 사전과제 제출 후 리팩토링 PR

- style-Components

반복해서 쓰이는 코드를 variables.js, theme.js 를 사용해 재사용하였습니다.



- auth

회원가입 / 로그인 API 모두 response로 token을 받아온다는 점을 이용해 fetch를 하나로 합쳤습니다.



- todo

TodoList.js 는 Todo.js 와 Todos.js 중간에서 props만 넘겨주는 역할을 하기 때문에 Todos.js 에서 바로 props를 넘겨줄 수 있게끔 삭제하였습니다.

Todos.js 에서 쓰이는 axios 를 한 컴포넌트에서 관리할 수 있도록 src 폴더 안에 API 폴더를 만들어, TodoAxios.js로 분리했습니다.

수정 기능 : 취소 버튼을 누르면 수정모드에서 입력했던 값과 check 값 모두 전 상태로 돌아갈 수 있도록 useRef를 사용해 다시 리팩토링하였습니다.

삭제 기능 : 삭제 후 location.reload()로 다시 랜더링 불러오는 로직에서 삭제한 todo를 제외한 나머지 todo 리스트를 불러오는 방식으로 hook을 일으키는 방향으로 리팩토링하였습니다.



- 어려웠던 점

auth 페이지, todo 페이지에서 각각 useEffect를 사용해 token이 없다면 로그인 페이지로, token이 있다면 todo 페이지로 가는 기능을 구현했는데 리팩토링 도중

TodoAxios.js 에서 전역변수로 둔

const access_token = localstorage.getItem('token')

가 token이 localstorage에 들어오기 전에 읽혀 todo 페이지에 접근할 수 없는 블로커가 있었습니다.

이는 todo 데이터를 TodoAxios.js 가 아닌 todos.js 에서 받는 방식으로도 기능이 작동되는 해결책이 있었으나
TodoAxios.js 에서의 access_token은 여전히 null 값으로 확인해

TodoAxios.js 에서의

const access_token = localstorage.getItem('token')

를

const access_token = () => localstorage.getItem('token')

함수형으로 바꾸어 axios 안에서 불러오도록 리팩토링하였습니다.

아쉬운 점이 있다면 전역에 헤더(access_token)을 담은 변수도 axios 안에 넣어주어야했는데
코드량이 늘어나, 어느 것이 효율적인 방법인지 고민하게 되었습니다.

