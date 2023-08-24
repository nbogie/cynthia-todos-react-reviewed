import { useEffect, useState } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";
import { TodoDB, TodoItem } from "./TodoTaskType";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { IoEnterOutline } from "react-icons/io5";

export default function ListTodo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editTodo, setEditTodo] = useState<number | null>();
  const [newDescription, setNewDescription] = useState("");
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
      // eslint-disable-next-line
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
      // eslint-disable-next-line
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
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const handleEditInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  const handleSubmitEdit = async (todo: TodoItem) => {
    try {
      const todoData: TodoItem = {
        description: newDescription,
        creationDate: todo.creationDate,
        completed: todo.completed,
      };
      // eslint-disable-next-line
      const response = await axios.patch(
        `${apiBaseURL}/todos/${todo.todoId}}`,
        todoData
      );
      const updatedTodos = todos.map((existingTodo) =>
        existingTodo.todoId === todo.todoId
          ? { ...existingTodo, description: newDescription }
          : existingTodo
      );
      setTodos(updatedTodos);
      setNewDescription("");
      setEditTodo(null);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const listAllTodos = todos.map((eachTodo) => (
    <div key={eachTodo.todoId}>
      {editTodo === eachTodo.todoId ? (
        <>
          <input
            type="text"
            placeholder={eachTodo.description}
            value={newDescription}
            onChange={handleEditInput}
          />
          <button onClick={() => handleSubmitEdit(eachTodo)}>
            <IoEnterOutline />
          </button>
        </>
      ) : (
        <>{eachTodo.description}</>
      )}

      <div>
        <button onClick={() => setEditTodo(eachTodo.todoId)}>
          <LuEdit />
        </button>
        <button
          onClick={() => {
            handleDelete(eachTodo.todoId as number);
          }}
        >
          <MdOutlineDelete />
        </button>
        <input
          type="checkbox"
          onChange={() => toggleComplete(eachTodo)}
          checked={eachTodo.completed}
        />
      </div>
    </div>
  ));
  return <>{listAllTodos}</>;
}
