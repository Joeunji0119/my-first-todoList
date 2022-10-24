import axios from 'axios';
import { API } from '../config';

const access_token = () => localStorage.getItem('token');

export const TodoAxios = {
  GET: async (navigate, setTodos) => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    if (!access_token()) {
      navigate('/');
    } else {
      try {
        const { data } = await axios.get(API.Todo, config);
        setTodos(data);
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  ADD: async todoInput => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    const { data } = await axios.post(
      API.Todo,
      {
        todo: todoInput,
        isCompleted: false,
      },
      config
    );
    return data;
  },

  PUT: async (checkedId, todo, isCompleted) => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    await axios.put(`${API.Todo}/${checkedId}`, { todo, isCompleted }, config);
  },

  DELETE: async checkedId => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    await axios.delete(`${API.Todo}/${checkedId}`, config);
  },
};
