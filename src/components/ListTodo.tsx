import { useEffect, useState, Fragment } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import axios, { all } from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";
import TodoType from "./TodoTaskType";

export default function ListTodo() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const getTodos = async () => {
    try {
      const response = await axios.get(apiBaseURL + "/todos");
      const allTodoData = response.data;
      setTodos(allTodoData);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const listAllTodos = todos.map((eachTodo) => (
    <li key={eachTodo.todo_id}> {eachTodo.description}</li>
  ));
  return (
    <Fragment>
      <ul>{listAllTodos}</ul>
    </Fragment>
  );
}
