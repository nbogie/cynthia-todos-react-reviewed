import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { DraftTodoItem } from "../types/todoItem";

interface NewTodoInputFormProps {
  onAdd: (todo: DraftTodoItem) => void;
}

export default function NewTodoInputForm({ onAdd }: NewTodoInputFormProps) {
  const [todoInput, setTodoInput] = useState<string>("");

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    const todoData: DraftTodoItem = {
      description: todoInput,
      completed: false,
    };

    onAdd(todoData);
    setTodoInput("");
  };

  const handleChangedTextInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoInput(event.target.value);
  };

  return (
    <>
      <Box w="100%" mb={8}>
        <form
          onSubmit={handleAddTodo}
          style={{ display: "flex", alignItems: "baseline" }}
        >
          <Input
            type="text"
            placeholder="what do you want to get done?"
            value={todoInput}
            onChange={handleChangedTextInput}
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
