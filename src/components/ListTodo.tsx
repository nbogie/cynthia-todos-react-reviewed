import { useEffect, useState, Fragment } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";
import { TodoDB, TodoItem } from "./TodoTaskType";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";

export default function ListTodo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const getTodos = async () => {
    try {
      const response = await axios.get(apiBaseURL + "/todos");
      const allTodoData = response.data.map((todo: TodoDB) => {
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
      });
      console.log(allTodoData);
      setTodos(allTodoData);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = async (todoId: number) => {
    try {
      const deleteTodo = await axios.delete(`${apiBaseURL}/todos/${todoId}}`);
      setTodos(todos.filter((todo) => todo.todoId !== todoId));
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const listAllTodos = todos.map((eachTodo) => (
    <Fragment key={eachTodo.todoId}>
      <li>
        {eachTodo.description}
        <button>
          <LuEdit />
        </button>
        <button
          onClick={() => {
            handleDelete(eachTodo.todoId as number);
          }}
        >
          <MdOutlineDelete />
        </button>
      </li>
    </Fragment>
  ));
  return (
    <>
      <ul>{listAllTodos}</ul>
    </>
  );
}
