import {
  Box,
  Button,
  Input,
  Divider,
  Heading,
  List,
  ListItem,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { BsTrashFill } from "react-icons/bs";
import { SyntheticEvent, useState } from "react";
import { createPollAsync } from "../lib/supabaseStore";
import { addScaleCorrection } from "framer-motion";
import { useRouter } from "next/router";
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
  const [error, setError] = useState("");
  const validPollOptions = pollOptions.filter((option) => option.description);
  const isSubmittable = validPollOptions.length >= 2 && title;
  const hideDeleteButton = pollOptions.length <= 2;
  const router = useRouter();
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

    // setPollOptions(pollOptions => {...pollOptions, [e.target.name]: e.target.value})
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
      setError("");
      const res = await createPollAsync(title, validPollOptions);
      router.push(`/poll/${res.body[0].id}`);
    } else {
      setError("Poll needs a title");
    }
  }

  return (
    <Box maxW="container.md" mx="auto">
      <Heading mb={10}>Create poll</Heading>
      <form onSubmit={handlePollSubmit}>
        <Box mb="10">
          <InputGroup>
            <Input
              variant="flushed"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>
          <Text as="span" d="block" color="red.500" fontSize="sm">
            {error}
          </Text>
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
                  />
                </InputRightElement>
              </InputGroup>
            </ListItem>
          </List>
        ))}
        <Box>
          <Button onClick={addNewOption}>Add new option</Button>
        </Box>
        <Button colorScheme="blue" type="submit" disabled={!isSubmittable}>
          Create
        </Button>
      </form>
    </Box>
  );
};

export default Home;
