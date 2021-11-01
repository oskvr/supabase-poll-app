import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { createPollAsync } from "../lib/supabaseStore";
interface PollOption {
  id: string;
  description: string;
}
const defaultPollOptions: PollOption[] = [
  { id: uuidv4(), description: "" },
  { id: uuidv4(), description: "" },
  { id: uuidv4(), description: "" },
];
const Home: NextPage = () => {
  const [pollOptions, setPollOptions] =
    useState<PollOption[]>(defaultPollOptions);
  const [title, setTitle] = useState("");
  const validPollOptions = pollOptions.filter((option) => option.description);
  const isSubmittable = validPollOptions.length >= 2 && title;
  const hideDeleteButton = pollOptions.length <= 2;
  const [canAddOptions, setCanAddOptions] = useState(true);
  const maxOptions = 5;
  const router = useRouter();

  useEffect(() => {
    pollOptions.length >= maxOptions ?? 5
      ? setCanAddOptions(false)
      : setCanAddOptions(true);
  }, [pollOptions]);

  function addNewOption(e: SyntheticEvent) {
    e.preventDefault();

    setPollOptions(() => [...pollOptions, { id: uuidv4(), description: "" }]);
  }

  function handleOptionChange(optionId: string, text: string) {
    setPollOptions(
      pollOptions.map((option) => {
        if (option.id === optionId) {
          return { ...option, description: text };
        } else {
          return option;
        }
      })
    );
  }

  function handleOptionDelete(optionId: string) {
    const newOptions = pollOptions.filter((i) => i.id !== optionId);

    setPollOptions(newOptions);
  }

  async function handlePollSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (pollOptions.length <= 2) {
      alert("Poll needs at least two options");
      return;
    }
    if (title) {
      const validPollOptions = pollOptions.filter(
        (option) => option.description
      );
      if (validPollOptions.length < 2) {
        alert("Poll needs at least two options");
        return;
      }
      const res = await createPollAsync(title, validPollOptions);
      try {
        router.push(`/poll/${res.body[0].id}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <Box maxW="container.md" mx="auto">
      <Heading mb={10}>Create poll</Heading>
      <form onSubmit={handlePollSubmit}>
        <Box mb="10">
          <InputGroup>
            <Input
              fontSize={25}
              variant="flushed"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <Text as="span" d="block" color="red.500" fontSize="sm"></Text>
        </Box>
        {pollOptions.map((option, index) => (
          <List key={option.id} my={3}>
            <ListItem>
              <InputGroup>
                <Input
                  value={option.description}
                  onChange={(e) =>
                    handleOptionChange(option.id, e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                />
                <InputRightElement>
                  <IconButton
                    hidden={hideDeleteButton}
                    aria-label="delete option"
                    icon={<BsTrashFill />}
                    size="xs"
                    colorScheme="red"
                    onClick={() => handleOptionDelete(option.id)}
                    tabIndex={-1}
                  />
                </InputRightElement>
              </InputGroup>
            </ListItem>
          </List>
        ))}
        <Box>
          <Button
            onClick={addNewOption}
            colorScheme="messenger"
            type="button"
            disabled={!canAddOptions}
          >
            Add new option
          </Button>
        </Box>
        <Button colorScheme="blue" type="submit" disabled={!isSubmittable}>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default Home;
