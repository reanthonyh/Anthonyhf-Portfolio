export interface Project {
  id: string;
  name: string;
  url: string | null;
  dateRange: string;
  description: string;
  highlights: string[];
  images: string[];
}
