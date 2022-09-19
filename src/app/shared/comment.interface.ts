export interface Comment {
  id: string;
  firebaseId?: string;
  text: string;
  timestamp: number;
  date?: string;
  editTimestamp?: number;
  editDate?: string | null;
}
