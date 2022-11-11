export interface TypeTodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export type TypeTodos = TypeTodo[];
