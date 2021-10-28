import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { usePoll } from "../../lib/supabaseStore";
import {
  Heading,
  Spinner,
  Box,
  List,
  ListItem,
  HStack,
  Checkbox,
  Text,
} from "@chakra-ui/react";

export default function Poll() {
  const router = useRouter();
  const { id } = router.query;
  const poll = usePoll(id);

  useEffect(() => {
    console.log(poll);
  }, [id, poll]);

  if (!poll) {
    return <Spinner />;
  }

  return (
    <Box>
      {<Heading>{poll?.title}</Heading>}
      <small>{`Poll created at ${poll.created_at}`}</small>
      <List key={poll.id}>
        {poll.options.map((option) => (
          <ListItem key={option.id}>
            <HStack>
              <Text>{option.description}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
