export interface Poll {
  id: string;
  created_at: string;
  title: string;
  options: PollOption[];
}
export interface PollOption {
  id: number;
  created_at: string;
  description: string;
}
