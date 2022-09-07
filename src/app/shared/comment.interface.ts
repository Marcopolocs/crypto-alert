export interface Comment {
  id: string;
  text: string;
  timestamp: string;
  date?: string;
  editTimestamp?: string;
  editDate?: string | null;
}
