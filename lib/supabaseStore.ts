import { createClient } from "@supabase/supabase-js";
import Voted from "pages/poll/[id]/voted";
import { useEffect, useState } from "react";
import { useImmer } from "use-immer";
import {
  Poll,
  PollCreateDto,
  PollOption,
  PollSearchResult,
} from "./models/poll";
import { Vote } from "./models/vote";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

interface SortOptions {
  column: keyof Poll;
  isAscending: boolean;
}
export function usePolls(sortOptions?: SortOptions) {
  const [polls, setPolls] = useState<Poll[] | null>();

  useEffect(() => {
    getPollsAsync(sortOptions).then(setPolls);
  }, [sortOptions]);

  return polls;
}

async function getPollsAsync(sortOptions: SortOptions | undefined) {
  try {
    const res = await supabase
      .from<Poll>("polls")
      .select("*, options(*, votes(*))")
      .order(sortOptions?.column || "created_at", {
        ascending: sortOptions?.isAscending || false,
      })
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
  ipAddress: string | number,
  pollId: any
) {
  const { data, error } = await supabase
    .from<Vote>("votes")
    // .select("ip_address, option_id(poll_id(id, user_validation_mode))");
    .select("*, options(*, polls(*))");
  // .eq("ip_address", ipAddress)
  //  eq("id", pollId)

  //TODO: skapa databasfunktion istället

  const { data: poll } = await supabase
    .from<Poll>("polls")
    .select("*, options(*, votes(*))")
    .eq("id", pollId)
    .single();

  const validationMode = poll?.user_validation_mode;
  let hasDuplicate = false;
  if (validationMode === "IP") {
    if (data) {
      await Promise.all(
        data.map(async (vote) => {
          if (
            vote.options.poll_id === pollId &&
            vote.ip_address === ipAddress
          ) {
            hasDuplicate = true;
            return;
          }
        })
      );
    }
  } else if (validationMode === "Browser") {
    console.log("Browser validation");
  }
  if (hasDuplicate) {
    throw "You can't vote twice on the same poll";
  }
  const res: any = await supabase.from("votes").insert([
    {
      option_id: selectedOption.id,
      ip_address: ipAddress,
    },
  ]);
  return res;
}

export async function testSupabaseRPCFunction() {
  const { data } = await supabase.rpc("get_test_2");
  console.log(data);
  return data;
}
