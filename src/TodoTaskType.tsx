export interface TodoItem {
  todoId: number;
  description: string;
  creationDate: string;
  completed: boolean;
}

export interface DraftTodoItem {
  description: string;
  completed: boolean;
}

export interface TodoDB {
  todo_id: number;
  description: string;
  creation_date: string;
  completed: boolean;
}

export function convertFromDBTodoToAppTodo(todo: TodoDB): TodoItem {
  const {
    todo_id: todoId,
    description,
    creation_date: creationDate,
    completed,
  } = todo;
  return {
    todoId,
    description,
    creationDate,
    completed,
  };
}
