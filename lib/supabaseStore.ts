import { createClient } from "@supabase/supabase-js";
import { TooltipModel } from "chart.js";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import {
  Poll,
  PollOption,
  PollCreateDto,
  PollSearchResult,
} from "./models/poll";
import { Vote } from "./models/vote";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export function usePolls() {
  const [polls, setPolls] = useState<Poll[] | null>();

  useEffect(() => {
    getPollsAsync().then(setPolls);
  }, []);

  return polls;
}

async function getPollsAsync() {
  try {
    const res = await supabase
      .from<Poll>("polls")
      .select("*, options(*, votes(*))")
      .eq("is_private", "false");
    return res.body;
  } catch (error) {
    console.error(error);
  }
}

export function usePoll(id: any) {
  const [poll, setPoll] = useImmer<Poll | undefined>(undefined);

  useEffect(() => {
    const pollListener = supabase
      .from<Vote>("votes")
      .on("INSERT", (payload) => {
        handleNewVote(payload.new);
      })
      .subscribe();
    return () => {
      pollListener.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getPollAsync(id).then(setPoll);
  }, [id]);

  function handleNewVote(newVote: Vote) {
    setPoll((poll) => {
      const optionToUpdate = poll?.options.find(
        (option) => option.id === newVote.option_id
      );
      optionToUpdate?.votes.push(newVote);
    });
  }
  function getTotalVoteCount() {
    let sum = 0;
    poll?.options.map((option) => {
      sum += option.votes.length;
    });
    return sum;
  }
  return { poll, totalVoteCount: getTotalVoteCount() };
}

async function getPollAsync(id: string): Promise<Poll | undefined> {
  if (!id) return;
  try {
    const res = await supabase
      .from("polls")
      .select("*, options(*, votes(*))")
      .eq("id", id)
      .single();
    let poll: Poll = res.body;
    const betterDate = new Date(poll.created_at).toLocaleString();
    poll.created_at = betterDate;
    return poll;
  } catch (error) {
    console.error(error);
  }
}

export async function createPollAsync(
  poll: PollCreateDto,
  pollOptions: PollOption[]
) {
  try {
    const res: any = await supabase.from("polls").insert([{ ...poll }]);
    await createPollOptionsAsync(pollOptions, res.body[0].id);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export async function createPollOptionsAsync(
  pollOptions: PollOption[],
  pollId: string
) {
  try {
    pollOptions.map(async (option) => {
      await supabase.from("options").insert([
        {
          description: option.description,
          poll_id: pollId,
        },
      ]);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function searchPollAsync(
  query: string
): Promise<PollSearchResult> {
  try {
    const searchResults = await supabase
      .from<Poll>("polls")
      .select("*, options(*, votes(*))")
      .ilike("title", `%${query}%`);
    return searchResults.body;
  } catch (error) {
    console.error();
  }
}

export async function createVoteAsync(
  selectedOption: PollOption,
  ipAddress: string | undefined,
  pollId: any
) {
  try {
    //Denna rad hämtar alla röst-objekt med samma ip address som ipAddress argumentet användaren ger
    const { data, error } = await supabase
      .from("votes")
      .select("*, options(poll_id, poll(user_validation_mode))");
    // const validationMode = data?.forEach(vote=>{
    //   if(vote.options.poll_id === pollId){
    //     return vote.options.poll.user_validation_mode;
    //   }
    // })
    let hasDuplicate = false;
    data?.forEach((element) => {
      if (
        element.options.poll_id === pollId &&
        element.ip_address === ipAddress
      ) {
        console.log("1. Detected duplicate vote");
        hasDuplicate = true;
        return;
      }
    });
    if (!hasDuplicate) {
      const res: any = await supabase.from("votes").insert([
        {
          option_id: selectedOption.id,
          ip_address: ipAddress,
        },
      ]);
      console.log("2. No duplication");
      return res || undefined;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function testSupabaseRPCFunction() {
  const { data } = await supabase.rpc("get_total_votes");
  console.log(data);
  return data;
}
