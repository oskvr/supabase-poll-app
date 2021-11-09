import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

export default function PageSpinner() {
  return (
    <Center h="70vh">
      <Spinner size="xl" />
    </Center>
  );
}
