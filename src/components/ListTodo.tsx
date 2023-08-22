import { useEffect, useState, Fragment } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";
import { TodoDB, TodoItem } from "./TodoTaskType";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import EditTodo from "./EditTodo";

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
      const updatedTodos = todos.filter((todo) => todo.todoId !== todoId);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const toggleComplete = async (todo: TodoItem) => {
    try {
      const todoData: TodoItem = {
        description: todo.description,
        creationDate: todo.creationDate,
        completed: !todo.completed,
      };
      console.log("completed status", todo.completed);
      const response = await axios.patch(
        `${apiBaseURL}/todos/${todo.todoId}}`,
        todoData
      );
      const updatedTodos = todos.map((existingTodo) =>
        existingTodo.todoId === todo.todoId
          ? { ...existingTodo, completed: !existingTodo.completed }
          : existingTodo
      );
      setTodos(updatedTodos);
      console.log(response);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const listAllTodos = todos.map((eachTodo) => (
    <div key={eachTodo.todoId}>
      {eachTodo.description}
      <div>
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
      </div>
      <input type="checkbox" onChange={() => toggleComplete(eachTodo)} />
    </div>
  ));
  return <>{listAllTodos}</>;
}
