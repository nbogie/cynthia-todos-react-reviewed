import axios from "axios";
import { DraftTodoItem, TodoItem } from "../types/todoItem";
import { apiBaseURL } from "../utils/apiBaseURL";

export async function getAllTodos() {
  return await axios.get(apiBaseURL + "/todos");
}

export async function addTodo(todo: DraftTodoItem) {
  return await axios.post(apiBaseURL + "/todos", todo);
}

export async function deleteTodo(todo: TodoItem) {
  return await axios.delete(`${apiBaseURL}/todos/${todo.id}`);
}

export async function updateTodo(todo: TodoItem) {
  return await axios.patch(`${apiBaseURL}/todos/${todo.id}`, todo);
}
