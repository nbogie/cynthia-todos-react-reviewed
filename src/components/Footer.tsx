import { Link } from "@chakra-ui/react";
export function Footer(): JSX.Element {
  return (
    <>
      <footer>
        <Link
          href="https://github.com/cynthiacodes/todo-react-app"
          target="_blank"
          color="pink.500"
        >
          frontend repo
        </Link>
        {" and "}
        <Link
          href="https://github.com/cynthiacodes/todo-app-server"
          target="_blank"
          color="pink.500"
        >
          backend repo
        </Link>
      </footer>
    </>
  );
}
