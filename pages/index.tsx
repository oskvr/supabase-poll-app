import { Center, Spinner } from "@chakra-ui/react";
import { NextPage } from "next";
import { usePolls } from "@/lib/supabaseStore";
import PageSpinner from "@/components/PageSpinner";

const LandingPage: NextPage = () => {
  const polls = usePolls();

  if (!polls) {
    return <PageSpinner />;
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
