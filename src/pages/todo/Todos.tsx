import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import Todo from './Todo';
import { TodoAxios } from '../../api/TodoAxios';
import { TypeTodos } from './TypeTodo';

const Todos = () => {
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState<TypeTodos>([]);

  const navigate = useNavigate();

  useEffect(() => {
    TodoAxios.GET(navigate, setTodos);
  }, [navigate]);

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodoInput(e.target.value);

  const plusTodo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await TodoAxios.ADD(todoInput);
    setTodos(pre => [...pre, data]);
    setTodoInput('');
  };

  const checkboxHandler = (checkedId: number) => {
    setTodos(pre =>
      pre.map(({ id, isCompleted, todo, userId }) => {
        if (id === checkedId) {
          isCompleted = !isCompleted;
        }

        return { id, isCompleted, todo, userId };
      })
    );
  };

  const UpdateValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    checkedId: number
  ) => {
    setTodos(pre =>
      pre.map(({ id, isCompleted, todo, userId }) => {
        if (id === checkedId) {
          todo = e.target.value;
        }
        return { id, isCompleted, todo, userId };
      })
    );
  };

  const TodoModify = async (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    const [targetValue]: TypeTodos = todos.filter(
      ({ id }) => id === Number(checkedId)
    );
    await TodoAxios.PUT(checkedId, targetValue.todo, targetValue.isCompleted);
    setToogle(pre => !pre);
  };

  const TodoDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    e.preventDefault();
    await TodoAxios.DELETE(checkedId);
    setTodos(prev => prev.filter(({ id }) => id !== Number(checkedId)));
    setToogle(pre => !pre);
    alert('삭제 완료');
  };

  const TodoChange = (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>,
    Ref: React.MutableRefObject<[boolean, string]>
  ) => {
    e.preventDefault();
    setTodos(prev =>
      prev.map(({ id, userId, isCompleted, todo }) => {
        if (id === checkedId) {
          isCompleted = Ref.current[0];
          todo = Ref.current[1];
          Ref.current[1] = '';
        }
        return { id, userId, isCompleted, todo };
      })
    );
    setToogle(pre => !pre);
  };

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
  ${props => props.theme.variables.absoluteCenter}
`;

const TodoBox = styled.div`
  width: 500px;
  height: auto;
  ${props => props.theme.variables.backGroundHover}
`;

const TodoText = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: black;
  margin: 50px 0 0 72px;
`;

const TodoForm = styled.div`
  ${props => props.theme.variables.flex('column')}
  margin: 70px 30px;
`;

const TodoInputBox = styled.form`
  ${props => props.theme.variables.flex()}
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
  background-color: ${props => props.theme.style.mainBlue};
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
