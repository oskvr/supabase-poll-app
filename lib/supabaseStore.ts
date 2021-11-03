import { createClient } from '@supabase/supabase-js'
import { useEffect, useState, useRef } from 'react'
import { urlToHttpOptions } from 'url'
import { useImmer } from 'use-immer'
import { Poll, PollOption } from './models/poll'
import { Vote } from './models/vote'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_KEY
)

export function usePolls() {
  const [polls, setPolls] = useState([])

  useEffect(() => {
    getPollsAsync().then(setPolls)
  }, [])

  return polls
}

async function getPollsAsync(): Promise<any> {
  try {
    const res = await supabase
      .from('polls')
      .select('*')
      .eq('isPrivate', 'false')
    return res
  } catch (error) {
    console.error(error)
  }
}

export function usePoll(id: any) {
  const [poll, setPoll] = useImmer<Poll | undefined>(undefined)

  useEffect(() => {
    const pollListener = supabase
      .from<Vote>('votes')
      .on('INSERT', payload => {
        handleNewVote(payload.new)
      })
      .subscribe()
    return () => {
      pollListener.unsubscribe()
    }
  }, [])

  useEffect(() => {
    getPollAsync(id).then(setPoll)
  }, [id])

  function handleNewVote(newVote: Vote) {
    // Använder immer för att uppdatera enklare
    setPoll(poll => {
      const optionToUpdate = poll?.options.find(
        option => option.id === newVote.option_id
      )
      optionToUpdate?.votes.push(newVote)
    })
  }
  function getTotalVoteCount() {
    let sum = 0
    poll?.options.map(option => {
      sum += option.votes.length
    })
    return sum
  }
  return { poll, totalVoteCount: getTotalVoteCount() }
}

async function getPollAsync(id: string): Promise<Poll | undefined> {
  if (!id) return
  try {
    const res = await supabase
      .from('polls')
      .select('*, options(*, votes(*))')
      .eq('id', id)
      .single()
    let poll: Poll = res.body
    const betterDate = new Date(poll.created_at).toLocaleString()
    poll.created_at = betterDate
    return poll
  } catch (error) {
    console.error(error)
  }
}

export async function createPollAsync(
  title: string,
  pollOptions: PollOption[],
  privateVisibility: boolean
) {
  try {
    const res: any = await supabase
      .from('polls')
      .insert([{ title: title, isPrivate: privateVisibility }])
    await createPollOptionsAsync(pollOptions, res.body[0].id)
    return res
  } catch (error) {
    console.error(error)
  }
}

export async function createPollOptionsAsync(
  pollOptions: PollOption[],
  pollId: string
) {
  try {
    pollOptions.map(async option => {
      await supabase.from('options').insert([
        {
          description: option.description,
          poll_id: pollId,
        },
      ])
    })
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
      .from('votes')
      .insert([{ option_id: optionId, ip_address: ipAddress }])
    // await createPollOptionsAsync(pollOptions, res.body[0].id);
    return res
  } catch (error) {
    console.error(error)
  }
}
