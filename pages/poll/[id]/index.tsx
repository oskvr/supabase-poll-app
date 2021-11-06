import { PollOption } from "@/lib/models/poll";
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
import React, { useEffect, useState } from "react";

export default function Poll(props: any) {
  const router = useRouter();
  const { id } = router.query;
  const { userIp } = props;
  const { poll, totalVoteCount } = usePoll(id);
  const [selectedOption, setSelectedOption] = useState<any>();
  const maxSelectedOptions = 3;

  if (!poll) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  async function handleSubmit() {
    await createVoteAsync(selectedOption, userIp, id);
    router.push(`/poll/${id}/voted`);
  }

  return (
    <Box pt="10">
      <Box maxW="container.lg" mx="auto" mt="10">
        <Heading>{poll?.title}</Heading>
        <Text as="small">
          Created at{" "}
          <Text as="span" color="gray.500">
            {poll.created_at}
          </Text>
        </Text>
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
                onChange={() => setSelectedOption(option)}
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

export async function getServerSideProps({ req }: any) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  return {
    props: {
      userIp: ip,
    },
  };
}
