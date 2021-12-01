import PageSpinner from "@/components/PageSpinner";
import StatusIcon from "@/components/StatusIcon";
import { Poll } from "@/lib/models/poll";
import { usePolls } from "@/lib/supabaseStore";
import {
  Box,
  Heading,
  HStack,
  Link,
  List,
  ListItem,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useEffect } from "react";

export function PollListItem({ poll }: { poll: Poll }) {
  const betterDate = new Date(poll.created_at).toLocaleDateString();
  const totalVotes = getTotalVoteCount();
  function getTotalVoteCount() {
    let sum = 0;
    poll?.options.map((option) => {
      sum += option.votes.length;
    });
    return sum;
  }
  return (
    <ListItem mb="5">
      <HStack
        border="1px"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.700" }}
        padding="5"
      >
        <Box>
          <HStack>
            <NextLink href={`/poll/${poll.id}`}>
              <Link>
                <Heading size="md">{poll.title}</Heading>
              </Link>
            </NextLink>
            <StatusIcon
              label={poll.is_closed ? "Closed" : ""}
              isLive={!poll.is_closed}
            />
          </HStack>
          <Text as="small" color="gray.500">
            {betterDate}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Heading size="md" color="blue.500">
            {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
          </Heading>
        </Box>
      </HStack>
    </ListItem>
  );
}

const LandingPage: NextPage = () => {
  const polls = usePolls({ column: "title", isAscending: true });
  if (!polls) {
    return <PageSpinner />;
  }

  // console.log(polls);

  return (
    <Box maxW="container.lg" mx="auto" my="20">
      <Box mb="10">
        <Heading>Discover Public Polls</Heading>
      </Box>

      <Tabs>
        <TabList>
          <Tab>New</Tab>
          <Tab>Most popular</Tab>
          <Tab>Trending</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              {polls.map((poll) => {
                return <PollListItem key={poll.id} poll={poll} />;
              })}
            </List>
          </TabPanel>
          <TabPanel>
            <PlaceholderMessage message="Show popular polls here" />
          </TabPanel>
          <TabPanel>
            <PlaceholderMessage message="Show trending polls here" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LandingPage;

function PlaceholderMessage({ message }: { message: string }) {
  return (
    <VStack h="xl" py={20}>
      <Heading
        fontWeight="thin"
        color="blackAlpha.500"
        _dark={{ color: "whiteAlpha.400" }}
      >
        {message}
      </Heading>
      ;
    </VStack>
  );
}
