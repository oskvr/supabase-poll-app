import BaseEntity from "./baseEntity";
import { Vote } from "./vote";

export interface Poll extends BaseEntity {
  title: string;
  options: PollOption[];
}
export interface PollOption extends BaseEntity {
  description: string;
  votes: Vote[];
}
