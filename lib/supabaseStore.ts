import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Poll, PollOption } from "./models/poll";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
);

export function usePoll(id: any): Poll | undefined {
  const [poll, setPoll] = useState<Poll>();
  useEffect(() => {
    if(id)
      getPollAsync(id).then(setPoll);
  }, [id]);

  return poll;
}

async function getPollAsync(id: string): Promise<Poll | undefined> {
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
  title: string,
  pollOptions: PollOption[]
) {
  try {
    const res: any = await supabase.from("polls").insert([{ title }]);
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
      await supabase
        .from("options")
        .insert([{ description: option.description, poll_id: pollId }]);
    });
  } catch (error) {
    console.error(error)
  }
}

export async function createVoteAsync(
  optionId: number | undefined,
  ipAddress: string
) {
  try {
    const res: any = await supabase
      .from("votes")
      .insert([{ option_id: optionId, ip_address: ipAddress }]);
    // await createPollOptionsAsync(pollOptions, res.body[0].id);
    return res;
  } catch (error) {
    console.error(error);
  }
}
