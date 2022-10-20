import React, { useState } from 'react';
import styled from 'styled-components';

const Todo = ({
  todoItem,
  checkboxHandler,
  UpdateValue,
  TodoModify,
  TodoDelete,
  TodoChange,
}) => {
  const { id, todo, isCompleted } = todoItem;
  const [toogle, setToogle] = useState(false);
  const statusModify = toogle ? '제출' : '수정';
  const statusDelete = toogle ? '취소' : '삭제';

  const inputProps = !toogle
    ? { readOnly: true }
    : { onChange: e => UpdateValue(e, id) };

  const TodoModifyProps = !toogle
    ? { onClick: () => setToogle(true) }
    : { onClick: e => TodoModify(e, id, setToogle) };

  const TodoDeleteProps = !toogle
    ? {
        onClick: e => {
          TodoDelete(e, id, setToogle);
          setToogle(pre => !pre);
        },
      }
    : {
        onClick: e => {
          setToogle(pre => !pre);
          TodoChange(e);
        },
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
  display: flex;
  align-items: center;
  font-size: 20px;
  margin-bottom: 10px;
`;

const TodoCheck = styled.input`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const TodoInput = styled.input`
  display: flex;
  align-items: center;
  width: 280px;
  height: 40px;
  border: none;
  border-bottom: 1px solid black;
`;

const TodoModifyButton = styled.button`
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

const TodoDeleteButton = styled(TodoModifyButton)``;
