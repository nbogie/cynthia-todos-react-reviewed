import getErrorMessage from "../utils/getErrorMessage";
import { useState } from "react";
import axios from "axios";
import TodoType from "./TodoTaskType";

export default function InputTodo() {
  const [todoInput, setTodoInput] = useState<string>("");

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    const apiBaseURL = "http://localhost:4000";
    event.preventDefault();
    try {
      const todoData: TodoType = {
        description: todoInput,
        creationDate: new Date(),
        completed: false,
      };
      console.log("the to do data", todoData);
      const response = await axios.post(apiBaseURL + "/todos", todoData);
      console.log(response);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  return (
    <>
      <h1>Input Todo</h1>
      <form className="todo-form" onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="write your todo here"
          value={todoInput}
          onChange={handleTodoInput}
          className="todo-input"
        />
        <button className="todo-button">Add</button>
      </form>
    </>
  );
}
