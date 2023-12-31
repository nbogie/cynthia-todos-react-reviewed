import { Box, Button, Checkbox } from "@chakra-ui/react";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { TodoItem } from "../../types/todoItem";
import { TodoOps } from "../../hooks/useTodosFromAPI";
import { OneTodoEditView } from "./OneTodoEditView";

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
  return (
    <Box
      key={todo.id}
      p={3}
      mt={1}
      border="1px"
      borderColor="inherit"
      borderRadius="md"
      w={"50rem"}
    >
      {isSelectedForEdit ? (
        <OneTodoEditView {...{ todo, todoOps, handleSelectForEditing }} />
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
        onClick={() => handleSelectForEditing(todo.id)}
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
