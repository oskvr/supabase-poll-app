import BaseEntity from "./baseEntity";

export interface Vote extends BaseEntity {
  option_id: number;
  ip_address: string;
}
