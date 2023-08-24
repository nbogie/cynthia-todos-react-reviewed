import { Heading } from "@chakra-ui/react";
import InputTodo from "./components/InputTodo";
import ListTodo from "./components/ListTodo";
import { Footer } from "./components/Footer";

export default function App(): JSX.Element {
  return (
    <>
      <Heading as="h1" size="3xl" noOfLines={1}>
        Get Things Done
      </Heading>
      <InputTodo />
      <ListTodo />
      <Footer />
    </>
  );
}
