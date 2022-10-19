import React from 'react';
import Todo from './Todo';

const TodoList = ({
  todos,
  checkboxHandler,
  UpdateValue,
  TodoModify,
  TodoDelete,
}) => {
  return todos.map(todoItem => (
    <Todo
      key={todoItem.id}
      todoItem={todoItem}
      checkboxHandler={checkboxHandler}
      UpdateValue={UpdateValue}
      TodoModify={TodoModify}
      TodoDelete={TodoDelete}
    />
  ));
};

export default TodoList;
