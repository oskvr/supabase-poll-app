import StatusIcon from "@/components/StatusIcon";
import { createVoteAsync, usePoll } from "@/lib/supabaseStore";
import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Poll() {
  const router = useRouter();
  const { id } = router.query;
  const { poll, totalVoteCount } = usePoll(id);
  const [selectedOptionId, setSelectedOptionId] = useState(0);
  const maxSelectedOptions = 3;

  if (!poll) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  async function handleSubmit() {
    await createVoteAsync(selectedOptionId, "127.0.0.1");
    router.push(`/poll/${id}/voted`);
  }

  return (
    <Box pt="10">
      <Box maxW="container.lg" mx="auto" mt="10">
        <Heading>{poll?.title}</Heading>
        <HStack>
          <Text as="small">
            Created at{" "}
            <Text as="span" color="gray.500">
              {poll.created_at}
            </Text>
          </Text>
          <StatusIcon
            isLive={!poll.is_closed}
            label={poll.is_closed ? "Closed" : "Open"}
          />
        </HStack>
        <RadioGroup pt="10">
          {poll.options.map((option, index) => (
            <HStack
              key={option.id}
              rounded="md"
              _hover={{
                bg: "rgba(0,0,0,0.05)",
                _dark: { bg: "rgba(255,255,255,0.1)" },
              }}
            >
              <Radio
                _hover={{
                  borderColor: "rgba(0,0,0,0.3)",
                  _dark: { borderColor: "rgba(255,255,255, 0.3)" },
                }}
                w="full"
                p="3"
                size="lg"
                cursor="pointer"
                value={option.description}
                onChange={() => setSelectedOptionId(+option.id)}
              >
                {option.description}
              </Radio>
            </HStack>
          ))}
        </RadioGroup>
        <Button my="5" onClick={handleSubmit}>
          Submit vote
        </Button>
      </Box>
    </Box>
  );
}
