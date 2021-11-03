import { Center, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { usePolls } from "@/lib/supabaseStore";

const LandingPage: NextPage = () => {
  const polls = usePolls();

  if (!polls) {
    return (
      <Center w="100vw" h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  // console.log(polls);

  return (
    <div>
      {polls.map((poll) => {
        return (
          <li key={poll.id}>
            <p>{poll.title}</p>
          </li>
        );
      })}
    </div>
  );
};

export default LandingPage;
