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
} from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";

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
const mockPolls: Poll[] = [
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Poll Hej",
    user_validation_mode: "IP",
    id: 1,
    created_at: "2020-01-01",
    is_closed: false,
    is_private: false,
    options: [
      {
        id: 1,
        created_at: "2020-01-01",
        description: "Hej",
        votes: [
          {
            created_at: "2020-01-01",
            id: 1,
            ip_address: "127.0.0.01",
            option_id: 2,
          },
        ],
      },
    ],
  },
];
const LandingPage: NextPage = () => {
  const polls = usePolls();

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
          <Tab>Most popular</Tab>
          <Tab>Trending</Tab>
          <Tab>New</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <List>
              {mockPolls.map((poll) => {
                return <PollListItem key={poll.id} poll={poll} />;
              })}
            </List>
          </TabPanel>
          <TabPanel>
            <List>
              {polls.map((poll) => {
                return <PollListItem key={poll.id} poll={poll} />;
              })}
            </List>
          </TabPanel>
          <TabPanel>
            <img src="https://i.ytimg.com/vi/I-CaC_43cZI/maxresdefault.jpg" />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LandingPage;
