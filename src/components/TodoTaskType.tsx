export interface TodoItem {
  todoId?: number;
  description: string;
  creationDate: Date;
  completed: boolean;
}

export interface TodoDB {
  todo_id: number;
  description: string;
  creation_date: string;
  completed: boolean;
}
