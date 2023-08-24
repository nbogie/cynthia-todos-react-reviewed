import getErrorMessage from "../utils/getErrorMessage";
import { useState } from "react";
import axios from "axios";
import { TodoItem } from "./TodoTaskType";
import { apiBaseURL } from "../utils/apiBaseURL";

export default function InputTodo() {
  const [todoInput, setTodoInput] = useState<string>("");

  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const todoData: TodoItem = {
        description: todoInput,
        creationDate: new Date(),
        completed: false,
      };
      setTodoInput("");
      // eslint-disable-next-line
      const response = await axios.post(apiBaseURL + "/todos", todoData);
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm}>
        <input
          type="text"
          placeholder="write your todo here"
          value={todoInput}
          onChange={handleTodoInput}
        />
        <button>Add</button>
      </form>
    </>
  );
}
