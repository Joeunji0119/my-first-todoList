import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Todo from './Todo';
import { API } from '../../config';

const Todos = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);

  const access_token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: 'Bearer ' + access_token },
  };

  const navigate = useNavigate();

  const onChangeTodo = e => setTodoInput(e.target.value);

  const plusTodo = async e => {
    e.preventDefault();
    const res = await axios.post(
      `${API.Todo}`,
      {
        todo: todoInput,
        isCompleted: false,
      },
      config
    );
    const { data } = res;
    setTodos(pre => [...pre, data]);
    setTodoInput('');
  };

  const checkboxHandler = checkedId => {
    setTodos(pre =>
      pre.map(({ id, isCompleted, todo, userId }) => {
        if (id === checkedId) {
          isCompleted = !isCompleted;
        }

        return { id, isCompleted, todo, userId };
      })
    );
  };

  const UpdateValue = (e, checkedId) => {
    setTodos(pre =>
      pre.map(({ id, isCompleted, todo, userId }) => {
        if (id === checkedId) {
          todo = e.target.value;
        }
        return { id, isCompleted, todo, userId };
      })
    );
  };

  const TodoModify = async (e, checkedId, setToogle) => {
    e.preventDefault();
    const [targetValue] = todos.filter(({ id }) => id === Number(checkedId));
    await axios.put(
      `${API.Todo}/${checkedId}`,
      {
        todo: targetValue.todo,
        isCompleted: targetValue.isCompleted,
      },
      config
    );
    setToogle(pre => !pre);
  };

  const TodoDelete = async (e, checkedId, setToogle) => {
    e.preventDefault();
    await axios.delete(`${API.Todo}/${checkedId}`, config);
    setToogle(pre => !pre);
    alert('삭제 완료');
    window.location.reload(true);
  };

  const TodoChange = e => {
    e.preventDefault();
    alert('취소되었습니다');
    window.location.reload(true);
  };

  useEffect(() => {
    const getTodoList = async () => {
      if (!access_token) {
        alert('로그인이 필요합니다');
        navigate('/');
      } else {
        try {
          const res = await axios.get(`${API.Todo}`, config);
          const { data } = res;
          setTodos(data);
        } catch (err) {
          throw new Error(err);
        }
      }
    };
    getTodoList();
  }, []);

  return (
    <Layout>
      <BackgroundColor>
        <LayoutCenter>
          <TodoBox>
            <TodoText>TODOLIST</TodoText>
            <TodoForm>
              <TodoInputBox>
                <TodoInput value={todoInput} onChange={e => onChangeTodo(e)} />
                <TodoButton onClick={e => plusTodo(e)}>추가</TodoButton>
              </TodoInputBox>
              <TodoListBox>
                {todos.map(todoItem => (
                  <Todo
                    key={todoItem.id}
                    todoItem={todoItem}
                    checkboxHandler={checkboxHandler}
                    UpdateValue={UpdateValue}
                    TodoModify={TodoModify}
                    TodoDelete={TodoDelete}
                    TodoChange={TodoChange}
                  />
                ))}
              </TodoListBox>
            </TodoForm>
          </TodoBox>
        </LayoutCenter>
      </BackgroundColor>
    </Layout>
  );
};

export default Todos;

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

const TodoBox = styled.div`
  width: 500px;
  height: auto;
  border: 1px #ababab solid;
  border-radius: 17px;
  &:hover {
    box-shadow: 1px 1px 20px #ddd;
  }
`;

const TodoText = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin: 50px 0 0 72px;
`;

const TodoForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 70px 30px;
`;

const TodoInputBox = styled.form`
  display: flex;
  justify-content: space-between;
`;

const TodoInput = styled.input`
  width: 350px;
  height: 40px;
  border: solid 1px #cccccc;
  border-radius: 5px;
`;

const TodoButton = styled.button`
  width: 50px;
  height: 40px;
  margin-left: 10px;
  background-color: #2087c9;
  color: #ffffff;
  border: none;
  border-radius: 5.5px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const TodoListBox = styled.div`
  margin-top: 50px;
`;
