import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import { usePoll } from "../../../lib/supabaseStore";

export default function Results() {
  const router = useRouter();
  const { id } = router.query;

  const poll = usePoll(id)

  if (!poll) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  

  return <div>{poll?.options.map((option) => {
    return <p key={option.id}>{`${option.description}: ${option.votes.length} votes`}</p>
  })}</div>;
}
