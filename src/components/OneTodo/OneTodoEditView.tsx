import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { TodoItem } from "../../TodoTaskType";
import { TodoOps } from "../../hooks/useTodosFromAPI";

interface OneTodoEditViewProps {
  todo: TodoItem;
  todoOps: TodoOps;
  handleSelectForEditing: (todoId: number | null) => void;
}

export function OneTodoEditView({
  todo,
  todoOps,
  handleSelectForEditing,
}: OneTodoEditViewProps) {
  const [newDescription, setNewDescription] = useState(todo.description);

  const handleEditInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };
  return (
    <>
      <Input
        type="text"
        placeholder={todo.description}
        value={newDescription}
        onChange={handleEditInput}
        htmlSize={50}
        width="auto"
        variant="flushed"
      />

      <Button
        colorScheme="pink"
        onClick={() => {
          todoOps.submitEdit(todo, newDescription);
          setNewDescription("");
          handleSelectForEditing(null);
        }}
      >
        <IoEnterOutline />
      </Button>
    </>
  );
}
