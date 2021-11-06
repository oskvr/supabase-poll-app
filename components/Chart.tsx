import React from "react";
import { Bar } from "react-chartjs-2";
import { useRandomColors } from "../hooks";
import { Poll, PollOption } from "../lib/models/poll";

interface PollChartProps {
  poll: Poll;
}
export default function Chart({ poll }: PollChartProps) {
  const colors = useRandomColors(poll.options?.length);
  // const colors = useStandardColors(poll.options?.length)
  const pollOptionLabels = poll.options?.map((option: PollOption) => {
    return option.description;
  });
  const voteCountData = poll.options?.map((option) => {
    return option.votes.length;
  });

  const data = {
    labels: pollOptionLabels,
    datasets: [
      {
        label: "# of votes",
        data: voteCountData,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const options = { aspectRatio: 2 };
  return <Bar data={data} options={options} />;
}
