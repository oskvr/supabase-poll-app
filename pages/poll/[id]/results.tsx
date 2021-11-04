import { Box, Center, Heading, HStack, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useRouter } from "next/router";
import Chart from "@/components/Chart";
import { usePoll } from "@/lib/supabaseStore";
import StatusIcon from "@/components/StatusIcon";

export default function Results() {
  const router = useRouter();
  const { id } = router.query;

  const { poll, totalVoteCount } = usePoll(id);

  if (!poll) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  return (
    <Box maxW="container.lg" mx="auto" py="10">
      <Heading>{poll?.title}</Heading>
      <HStack>
        <Text as="span">(Total votes: {totalVoteCount})</Text>
        <StatusIcon
          isLive={!poll.is_closed}
          label={poll.is_closed ? "Closed" : "Open"}
        />
      </HStack>
      <Chart poll={poll} />
    </Box>
  );
}
