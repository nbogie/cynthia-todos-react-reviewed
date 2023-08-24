import { Heading } from "@chakra-ui/react";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import { Footer } from "./components/Footer";

export default function App(): JSX.Element {
  return (
    <>
      <Heading as="h1" size="3xl" noOfLines={1}>
        Get Things Done
      </Heading>
      <InputTodo />
      <TodoList />
      <Footer />
    </>
  );
}
