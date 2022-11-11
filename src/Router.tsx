import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './pages/auth/User';
import Todos from './pages/todo/Todos';

const Router = () => {
  return (
    <BrowserRouter basename="/wanted-pre-onboarding-frontend">
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/signup" element={<User />} />
        <Route path="/todo" element={<Todos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
