export interface Poll {
  id: string;
  created_at: string;
  title: string;
  options: PollOption[];
}
export interface PollOption {
  id: number | string;
  created_at?: string;
  description: string;
}
