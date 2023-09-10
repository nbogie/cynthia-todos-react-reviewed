import { useEffect, useState } from "react";
import getErrorMessage from "../utils/getErrorMessage";
import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";
import { TodoDB, TodoItem } from "./TodoTaskType";
import { LuEdit } from "react-icons/lu";
import { MdOutlineDelete } from "react-icons/md";
import { IoEnterOutline } from "react-icons/io5";
import { Box, Button, Checkbox, Input } from "@chakra-ui/react";
import InputTodo from "./InputTodo";

export default function TodoList() {
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
      const url = `${apiBaseURL}/todos/${todoId}`;
      console.log("deleting with url", { url });
      const axiosResponse = await axios.delete(url);
      console.log("The following to-do deleted", axiosResponse.data);
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
      const response = await axios.patch(
        `${apiBaseURL}/todos/${todo.todoId}}`,
        todoData
      );
      console.log("The following to-do task was updated", response.data);
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
      const response = await axios.patch(
        `${apiBaseURL}/todos/${todo.todoId}}`,
        todoData
      );
      console.log("The following to-do has been updated", response.data);
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
    <Box
      key={eachTodo.todoId}
      p={3}
      mt={1}
      border="1px"
      borderColor="inherit"
      borderRadius="md"
    >
      {editTodo === eachTodo.todoId ? (
        <>
          <Input
            type="text"
            placeholder={eachTodo.description}
            value={newDescription}
            onChange={handleEditInput}
            htmlSize={50}
            width="auto"
            variant="flushed"
          />
          <Button colorScheme="pink" onClick={() => handleSubmitEdit(eachTodo)}>
            <IoEnterOutline />
          </Button>
        </>
      ) : (
        <>
          <Checkbox
            size="lg"
            colorScheme="pink"
            isChecked={eachTodo.completed}
            onChange={() => toggleComplete(eachTodo)}
          ></Checkbox>
          {eachTodo.description}
        </>
      )}

      <Button
        size="sm"
        ml={2}
        colorScheme="pink"
        onClick={() => setEditTodo(eachTodo.todoId)}
      >
        <LuEdit />
      </Button>
      <Button
        size="sm"
        ml={2}
        colorScheme="pink"
        onClick={() => {
          handleDelete(eachTodo.todoId as number);
        }}
      >
        <MdOutlineDelete />
      </Button>
    </Box>
  ));
  return (
    <>
      <InputTodo onAdd={() => getTodos()} />
      {listAllTodos}
    </>
  );
}
