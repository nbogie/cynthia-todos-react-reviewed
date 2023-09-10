import getErrorMessage from "../utils/getErrorMessage";
import { useState } from "react";
import axios from "axios";
import { TodoItem } from "./TodoTaskType";
import { apiBaseURL } from "../utils/apiBaseURL";
import { Box, Button, Input } from "@chakra-ui/react";

interface InputTodoProps {
  onAdd: () => void;
}

export default function InputTodo({ onAdd }: InputTodoProps) {
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
      const response = await axios.post(apiBaseURL + "/todos", todoData);
      console.log("The following todo has been added", response.data);
      onAdd();
    } catch (error) {
      console.error(getErrorMessage(error));
    }
  };

  const handleTodoInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoInput(event.target.value);
  };

  return (
    <>
      <Box w="100%" mb={8}>
        <form
          onSubmit={handleSubmitForm}
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <Input
            type="text"
            placeholder="what do you want to get done?"
            value={todoInput}
            onChange={handleTodoInput}
            variant="outline"
            flexGrow={1}
            marginRight={2}
          />
          <Button mt={4} colorScheme="pink" type="submit">
            Add
          </Button>
        </form>
      </Box>
    </>
  );
}
