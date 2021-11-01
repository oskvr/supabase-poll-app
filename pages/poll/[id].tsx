import React, { useEffect, useState } from "react";
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
  Radio,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import { PollOption } from "../../lib/models/poll";

export default function Poll() {
  const router = useRouter();
  const { id } = router.query;
  const poll = usePoll(id);
  const [selectedOption, setSelectedOption] = useState<PollOption>();

  const maxSelectedOptions = 3;

  useEffect(() => {
    //console.log(poll);
  }, [id, poll]);

  if (!poll) {
    return <Spinner size="lg" position="absolute" top="50%" left="50%" />;
  }

  function handleSubmit() {
    console.log(selectedOption);
  }

  return (
    <Box pt="10">
      <Box maxW="container.lg" mx="auto" mt="10">
        {<Heading>{poll?.title}</Heading>}
        <small>{`Poll created at ${poll.created_at}`}</small>
        <RadioGroup pt="10">
          {poll.options.map((option, index) => (
            <HStack
              key={option.id}
              rounded="md"
              _hover={{ bg: "rgba(255,255,255,0.05)" }}
            >
              <Radio
                w="full"
                p="3"
                cursor="pointer"
                transition="0.2s"
                value={option.description}
                onChange={() => setSelectedOption(option)}
              >
                {option.description}
              </Radio>
              {/* <Checkbox
                  id="checkbox-id"
                  name={`${option.description}`}
                  onChange={handleIsChecked}
                  // isChecked={handleIsChecked}
                  size="lg"
                  >
                  <Text as="span" ml="1">
                  {option.description}
                  </Text>
                </Checkbox> */}
            </HStack>
          ))}
        </RadioGroup>
        <Button
          my="5"
          onClick={() => console.log("Submitting", selectedOption?.id)}
        >
          Submit vote
        </Button>
      </Box>
    </Box>
  );
}
