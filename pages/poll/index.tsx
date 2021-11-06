import { UserValidationMode } from "@/lib/models/poll";
import { createPollAsync } from "@/lib/supabaseStore";
import {
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  LightMode,
  List,
  ListItem,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { BsPlusCircle, BsTrashFill } from "react-icons/bs";

let inputId = 1;
const defaultPollOptions: any[] = [
  { id: inputId++, description: "" },
  { id: inputId++, description: "" },
];

const CreatePoll: NextPage = () => {
  const [pollOptions, setPollOptions] = useState<any[]>(defaultPollOptions);
  const [title, setTitle] = useState("");
  const validPollOptions = pollOptions.filter((option) => option.description);
  const isSubmittable = validPollOptions.length >= 2 && title;
  const disableDeleteButton = pollOptions.length <= 2;
  const [canAddOptions, setCanAddOptions] = useState(true);
  const maxOptions = 10;
  const router = useRouter();

  const [privateVisibility, setPrivateVisibility] = useState(false);
  const [allowMultipleAnswers, setAllowMultipleAnswers] = useState(false);
  const [userValidationMode, setUserValidationMode] =
    useState<UserValidationMode>("IP");

  useEffect(() => {
    pollOptions.length >= maxOptions ?? 5
      ? setCanAddOptions(false)
      : setCanAddOptions(true);
  }, [pollOptions]);

  function addNewOption(e: SyntheticEvent) {
    e.preventDefault();
    setPollOptions(() => [...pollOptions, { id: inputId++, description: "" }]);
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
    setPollOptions(pollOptions.filter((i) => i.id !== optionId));
  }

  async function handlePollSubmit(e: SyntheticEvent) {
    e.preventDefault();

    if (pollOptions.length < 2) {
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
      const res = await createPollAsync(
        {
          is_private: privateVisibility,
          title,
          user_validation_mode: userValidationMode,
        },
        validPollOptions
      );
      const pollId = res.body[0].id;
      try {
        router.push(`/poll/${pollId}`);
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleValidationModeChange(e: ChangeEvent<HTMLSelectElement>) {
    setUserValidationMode(e.target.value as UserValidationMode);
  }

  return (
    <Box overflow="auto">
      <Box
        maxW="container.md"
        mx="auto"
        boxShadow="base"
        rounded="lg"
        p="10"
        my="10"
      >
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
                    placeholder={option.id}
                  />
                  <InputRightElement>
                    <LightMode>
                      <IconButton
                        disabled={disableDeleteButton}
                        aria-label="delete option"
                        icon={<BsTrashFill />}
                        size="md"
                        roundedLeft="none"
                        colorScheme="red"
                        onClick={() => handleOptionDelete(option.id)}
                      />
                    </LightMode>
                  </InputRightElement>
                </InputGroup>
              </ListItem>
            </List>
          ))}
          <Box className="addOptionBox" mb="3">
            <Button
              aria-label="Add new option"
              size="sm"
              variant="ghost"
              leftIcon={<BsPlusCircle />}
              onClick={addNewOption}
              type="button"
              disabled={!canAddOptions}
            >
              Add new option
            </Button>
          </Box>
          <Box className="switchOptionsBox" my="7">
            <Stack direction="row" mb="3">
              <Switch
                onChange={() => setPrivateVisibility(!privateVisibility)}
              />
              <p>Make poll private</p>
            </Stack>
            <Stack direction="row" mb="3">
              <Switch
                onChange={() => setAllowMultipleAnswers(!allowMultipleAnswers)}
              />
              <p>Allow multiple answers</p>
            </Stack>
            <Stack direction="row" mb="3">
              <Select
                defaultValue={userValidationMode}
                variant="outline"
                onChange={handleValidationModeChange}
              >
                <option value="IP">Check for duplicate IP address</option>
                <option value="Browser">
                  Check for duplicate browser session
                </option>
              </Select>
            </Stack>
          </Box>
          <Button colorScheme="blue" type="submit" disabled={!isSubmittable}>
            Create poll
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CreatePoll;