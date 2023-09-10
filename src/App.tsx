import { Box, Flex, Heading } from "@chakra-ui/react";
import { Footer } from "./components/Footer";
import TodoList from "./components/TodoList";

export default function App(): JSX.Element {
  return (
    <>
      <Box>
        <Flex align="center" h="100%" justify="flex-start" direction="column">
          <Heading as="h1" size="3xl" noOfLines={1}>
            Get Things Done
          </Heading>

          <TodoList />
          <Footer />
        </Flex>
      </Box>
    </>
  );
}
