import { TypeTodo } from './TypeTodo';

export interface TodoProps {
  todoItem: TypeTodo;
  checkboxHandler: (checkedId: number) => void;
  UpdateValue: (
    e: React.ChangeEvent<HTMLInputElement>,
    checkedId: number
  ) => void;
  TodoModify: (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  TodoDelete: (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
  TodoChange: (
    e: React.MouseEvent<HTMLButtonElement>,
    checkedId: number,
    setToogle: React.Dispatch<React.SetStateAction<boolean>>,
    Ref: React.MutableRefObject<[boolean, string]>
  ) => void;
}
