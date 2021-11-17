import InfoPopover from "@/components/InfoPopover";
import ShareButton from "@/components/ShareButton";
import { testSupabaseRPCFunction } from "@/lib/supabaseStore";
import {
  Box,
  Button,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Select,
  Stack,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useCreatePollForm } from "hooks";
import type { NextPage } from "next";
import { useEffect } from "react";
import { BsPlusCircle, BsTrash } from "react-icons/bs";

const CreatePoll: NextPage = () => {
  const {
    pollOptions,
    handleDelete,
    handleNewOption,
    handleOptionChange,
    handleSubmit,
    handleValidationModeChange,
    toggleMultipleAnswers,
    togglePrivateVisibility,
    isSubmittable,
    title,
    setTitle,
  } = useCreatePollForm();

  const disableDeleteButton = pollOptions.length <= 2;

  useEffect(() => {
    testSupabaseRPCFunction();
  }, []);
  return (
    <Box overflow="auto">
      <Box
        maxW="container.md"
        mx="auto"
        shadow="sm"
        border="1px solid"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
        rounded="lg"
        p="10"
        my="10"
      >
        <Heading mb={10}>Create poll</Heading>
        <form onSubmit={handleSubmit}>
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
          <List>
            {pollOptions.map((option, index) => (
              <ListItem
                key={option.id}
                // transition={{ type: "spring", stiffness: "100" }}
                mb="3"
              >
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
                      disabled={disableDeleteButton}
                      aria-label="Delete option"
                      icon={<BsTrash />}
                      variant="ghost"
                      roundedLeft="none"
                      color="red.500"
                      onClick={() => handleDelete(option.id)}
                    />
                  </InputRightElement>
                </InputGroup>
              </ListItem>
            ))}
          </List>
          {/* </AnimateSharedLayout> */}
          <Box className="addOptionBox" mb="3">
            <Button
              aria-label="Add new option"
              size="sm"
              variant="ghost"
              leftIcon={<BsPlusCircle />}
              onClick={handleNewOption}
              type="button"
              // disabled={!canAddOptions}
            >
              Add new option
            </Button>
          </Box>
          <VStack align="start" my="7">
            <FormControl display="flex" alignItems="center">
              <Switch onChange={togglePrivateVisibility}>
                Make poll private
              </Switch>
              <InfoPopover>Poll will only be accessible by link</InfoPopover>
            </FormControl>
            <FormControl display="flex" alignItems="center">
              <Switch onChange={toggleMultipleAnswers}>
                Allow multiple answers
              </Switch>
            </FormControl>
            <Stack direction="row" mb="3">
              <Select
                defaultValue={"IP"}
                variant="outline"
                onChange={handleValidationModeChange}
              >
                <option value="IP">Check for duplicate IP address</option>
                <option value="Browser">
                  Check for duplicate browser session
                </option>
              </Select>
              <InfoPopover>
                <strong>IP Duplication Checking</strong> - Duplicate votes will
                be disallowed based on the IP address of the user.
                <br />
                <br />
                <strong>Browser Duplication Checking</strong> - Duplicate votes
                will be disallowed based on the browser of the user, allowing
                multiple votes from the same IP address.
              </InfoPopover>
            </Stack>
          </VStack>
          <Button colorScheme="blue" type="submit" disabled={!isSubmittable}>
            Create poll
          </Button>
        </form>
      </Box>
      {/* <ShareButton text="Share result" textAfterCopy="Link copied" /> */}
    </Box>
  );
};

export default CreatePoll;
