export interface ChecklistItem {
  id: string;
  text: string;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  sourceNote?: string;
}
