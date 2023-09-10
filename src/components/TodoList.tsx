import { useState } from "react";
import { useTodosFromAPI } from "../hooks/useTodosFromAPI";
import NewTodoInputForm from "./NewTodoInputForm";
import { OneTodoView } from "./OneTodo/OneTodoView";
import { VStack } from "@chakra-ui/react";

export default function TodoList() {
  const [selectedIdForEditing, setSelectedIdForEditing] = useState<
    number | null
  >(null);

  const { todos, todoOps } = useTodosFromAPI();

  return (
    <>
      <NewTodoInputForm onAdd={todoOps.add} />

      <VStack align="start" w={"50rem"}>
        {todos.map((todo) => (
          <OneTodoView
            key={todo.id}
            {...{
              todo,
              todoOps,
              handleSelectForEditing: setSelectedIdForEditing,
              isSelectedForEdit: selectedIdForEditing === todo.id,
            }}
          />
        ))}
      </VStack>
    </>
  );
}
