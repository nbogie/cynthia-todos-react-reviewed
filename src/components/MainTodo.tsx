import { Heading } from "@chakra-ui/react";
import InputTodo from "./InputTodo";
import ListTodo from "./ListTodo";

export default function MainTodo() {
  return (
    <>
      <Heading as="h1" size="3xl" noOfLines={1}>
        Get Things Done
      </Heading>
      <InputTodo />
      <ListTodo />
    </>
  );
}
