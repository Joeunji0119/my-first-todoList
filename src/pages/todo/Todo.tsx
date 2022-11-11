import React, { useState } from 'react';
import { useRef } from 'react';
import styled from 'styled-components';
import { TodoProps } from './todo.types';

const Todo = ({
  todoItem,
  checkboxHandler,
  UpdateValue,
  TodoModify,
  TodoDelete,
  TodoChange,
}: TodoProps) => {
  const { id, todo, isCompleted } = todoItem;
  const [toogle, setToogle] = useState(false);
  const statusModify = toogle ? '제출' : '수정';
  const statusDelete = toogle ? '취소' : '삭제';
  const Ref = useRef<[boolean, string]>([false, '']);

  const inputProps = !toogle
    ? { readOnly: true }
    : {
        onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
          UpdateValue(e, id),
      };

  const TodoModifyProps = !toogle
    ? {
        onClick: () => {
          setToogle(true);
          Ref.current[0] = isCompleted;
          Ref.current[1] = todo;
        },
      }
    : {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
          TodoModify(e, id, setToogle);
        },
      };

  const TodoDeleteProps = !toogle
    ? {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
          TodoDelete(e, id, setToogle),
      }
    : {
        onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
          TodoChange(e, id, setToogle, Ref),
      };

  return (
    <TodoLayout>
      <TodoCheck
        checked={isCompleted}
        onClick={() => checkboxHandler(id)}
        readOnly
        type="checkbox"
      />
      <TodoInput value={todo} {...inputProps} />
      <TodoModifyButton {...TodoModifyProps}> {statusModify} </TodoModifyButton>
      <TodoDeleteButton {...TodoDeleteProps}> {statusDelete} </TodoDeleteButton>
    </TodoLayout>
  );
};

export default Todo;

const TodoLayout = styled.div`
  ${props => props.theme.variables.flex()};
  margin-bottom: 10px;
  font-size: 20px;
`;

const TodoCheck = styled.input`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const TodoInput = styled.input`
  ${props => props.theme.variables.flex()};
  width: 280px;
  height: 40px;
  border: none;
  border-bottom: 1px solid black;
`;

const TodoModifyButton = styled.button`
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

const TodoDeleteButton = styled(TodoModifyButton)``;
