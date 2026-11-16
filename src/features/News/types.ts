export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  publishedAt: string;
  sourceUrl: string;
  sourceName: string;
}