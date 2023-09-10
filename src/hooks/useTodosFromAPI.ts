import { useEffect, useState } from "react";
import {
  DraftTodoItem,
  TodoDB,
  TodoItem,
  convertFromDBTodoToAppTodo,
} from "../types/todoItem";
import getErrorMessage from "../utils/getErrorMessage";
import * as api from "../api/todosAPI";

export interface TodoOps {
  delete: (todo: TodoItem) => void;
  toggleComplete: (todo: TodoItem) => void;
  submitEdit: (todo: TodoItem, newDesc: string) => void;
  add: (todo: DraftTodoItem) => void;
  refresh: () => void;
}

export function useTodosFromAPI(): { todos: TodoItem[]; todoOps: TodoOps } {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const fetchAndStoreTODOsFromAPI = async () => {
    try {
      const response = await api.getAllTodos();
      const allTodoData = response.data.map((todo: TodoDB) =>
        convertFromDBTodoToAppTodo(todo)
      );
      setTodos(allTodoData);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  useEffect(() => {
    fetchAndStoreTODOsFromAPI();
  }, []);

  const handleDelete = async (todo: TodoItem) => {
    try {
      await api.deleteTodo(todo);
      await fetchAndStoreTODOsFromAPI();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };
  async function handleAdd(todo: DraftTodoItem) {
    try {
      await api.addTodo(todo);
      await fetchAndStoreTODOsFromAPI();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  }

  const handleSubmitEdit = async (todo: TodoItem, newDescription: string) => {
    try {
      const todoData: TodoItem = { ...todo, description: newDescription };
      await api.updateTodo(todoData);
      await fetchAndStoreTODOsFromAPI();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const handleToggleComplete = async (todo: TodoItem) => {
    try {
      const todoData: TodoItem = { ...todo, completed: !todo.completed };
      await api.updateTodo(todoData);
      await fetchAndStoreTODOsFromAPI();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  return {
    todos,
    todoOps: {
      delete: handleDelete,
      submitEdit: handleSubmitEdit,
      toggleComplete: handleToggleComplete,
      add: handleAdd,
      refresh: fetchAndStoreTODOsFromAPI,
    },
  };
}
