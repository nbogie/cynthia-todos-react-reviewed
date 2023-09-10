import { useState } from "react";
import { useTodosFromAPI } from "../hooks/useTodosFromAPI";
import NewTodoInputForm from "./NewTodoInputForm";
import { OneTodoView } from "./OneTodo/OneTodoView";

export default function TodoList() {
  const [selectedIdForEditing, setSelectedIdForEditing] = useState<
    number | null
  >(null);

  const { todos, todoOps } = useTodosFromAPI();

  return (
    <>
      <NewTodoInputForm onAdd={todoOps.add} />

      {todos.map((todo) => (
        <OneTodoView
          key={todo.todoId}
          {...{
            todo,
            todoOps,
            handleSelectForEditing: setSelectedIdForEditing,
            isSelectedForEdit: selectedIdForEditing === todo.todoId,
          }}
        />
      ))}
    </>
  );
}
