import BaseEntity from "./baseEntity";
import { Vote } from "./vote";

export type UserValidationMode = "IP" | "Browser";

export interface Poll extends BaseEntity {
  title: string;
  is_private: boolean;
  is_closed: boolean;
  user_validation_mode: UserValidationMode;
  options: PollOption[];
}
export interface PollCreateDto
  extends Omit<Poll, "id" | "created_at" | "is_closed" | "options"> {}

export interface PollOption extends BaseEntity {
  description: string;
  votes: Vote[];
}
