import React, { useState } from 'react';
import styled from 'styled-components';

const Todo = ({
  todoItem,
  checkboxHandler,
  UpdateValue,
  TodoModify,
  TodoDelete,
}) => {
  const { id, todo, isCompleted } = todoItem;
  const [toogle, setToogle] = useState(false);
  const [statusModify, setStatusModify] = useState('수정');
  const [statusDelete, setStatusDelete] = useState('삭제');

  const inputProps = !toogle
    ? { readOnly: true }
    : { onChange: e => UpdateValue(e, id) };

  const TodoModifyProps = !toogle
    ? {
        onClick: () => {
          setToogle(true);
          setStatusModify('제출');
          setStatusDelete('취소');
        },
      }
    : {
        onClick: e => {
          TodoModify(e, id, setToogle);
          setStatusModify('수정');
          setStatusDelete('삭제');
        },
      };

  const TodoDeleteProps = !toogle
    ? {
        onClick: e => {
          TodoDelete(e, id, setToogle);
        },
      }
    : {
        onClick: () => {
          setStatusDelete('삭제');
          setToogle(false);
        },
      };

  return (
    <TodoLayout>
      <TodoCheck
        checked={isCompleted}
        readOnly
        onClick={() => checkboxHandler(id)}
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
