import { Box, Button, Checkbox, Input } from "@chakra-ui/react";
import { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { TodoItem } from "../TodoTaskType";
import { TodoOps } from "../hooks/useTodosFromAPI";

interface OneTodoViewProps {
  todo: TodoItem;
  todoOps: TodoOps;

  handleSelectForEditing: (todo: number | null) => void;
  isSelectedForEdit: boolean;
}

export function OneTodoView({
  todo,
  todoOps,
  handleSelectForEditing,
  isSelectedForEdit,
}: OneTodoViewProps) {
  const [newDescription, setNewDescription] = useState("");

  const handleEditInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewDescription(event.target.value);
  };

  return (
    <Box
      key={todo.todoId}
      p={3}
      mt={1}
      border="1px"
      borderColor="inherit"
      borderRadius="md"
    >
      {isSelectedForEdit ? (
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
      ) : (
        <>
          <Checkbox
            size="lg"
            colorScheme="pink"
            isChecked={todo.completed}
            onChange={() => todoOps.toggleComplete(todo)}
          ></Checkbox>
          {todo.description}
        </>
      )}

      <Button
        size="sm"
        ml={2}
        colorScheme="pink"
        onClick={() => handleSelectForEditing(todo.todoId)}
      >
        <LuEdit />
      </Button>
      <Button
        size="sm"
        ml={2}
        colorScheme="pink"
        onClick={() => {
          todoOps.delete(todo);
        }}
      >
        <MdOutlineDelete />
      </Button>
    </Box>
  );
}
