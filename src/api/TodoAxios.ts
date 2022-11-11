import axios from 'axios';
import { API } from '../config';
import { NavigateFunction } from 'react-router-dom';
import { TypeTodos } from 'pages/todo/TypeTodo';

const access_token = () => localStorage.getItem('token');

export const TodoAxios = {
  GET: async (
    navigate: NavigateFunction,
    setTodos: React.Dispatch<React.SetStateAction<TypeTodos>>
  ) => {
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
        if (err instanceof Error) {
          console.error(err);
        }
      }
    }
  },
  ADD: async (todoInput: string) => {
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

  PUT: async (checkedId: number, todo: string, isCompleted: boolean) => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    await axios.put(`${API.Todo}/${checkedId}`, { todo, isCompleted }, config);
  },

  DELETE: async (checkedId: number) => {
    const config = {
      headers: { Authorization: 'Bearer ' + access_token() },
    };
    await axios.delete(`${API.Todo}/${checkedId}`, config);
  },
};
