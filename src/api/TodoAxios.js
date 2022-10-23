import axios from 'axios';
import { API } from '../config';

const access_token = localStorage.getItem('token');
const config = {
  headers: { Authorization: 'Bearer ' + access_token },
};

export const TodoAxios = {
  GET: async (navigate, setTodos) => {
    if (!access_token) {
      navigate('/');
    } else {
      try {
        console.log('1231');
        const { data } = await axios.get(API.Todo, config);
        setTodos(data);
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  ADD: async todoInput => {
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
    await axios.put(`${API.Todo}/${checkedId}`, { todo, isCompleted }, config);
  },

  DELETE: async checkedId => {
    await axios.delete(`${API.Todo}/${checkedId}`, config);
  },
};
