import BaseEntity from "./baseEntity";
import { PollOption } from "./poll";

export interface Vote extends BaseEntity {
  option_id: number;
  ip_address: string;
  options: PollOption;
}
