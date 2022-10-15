import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './pages/auth/User';
// import TodoList from './pages/Todo/TodoList';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/signup" element={<User />} />
        {/* <Route path="/todo" element={<TodoList />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
