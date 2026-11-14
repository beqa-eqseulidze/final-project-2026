import type { NewsItem } from './types';

const API_KEY = 'eda408a754c04e3c882556e71e00ddf5';

// number=10 ნიშნავს, რომ ზუსტად 10 სიახლეს წამოიღებს
const API_URL = 'https://api.worldnewsapi.com/search-news?source-country=ge&language=en&sort=publish-time&sort-direction=DESC&number=10';

export async function fetchGeorgianNews(limit = 10): Promise<NewsItem[]> {
  const res = await fetch(API_URL, {
    headers: {
      'x-api-key': API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`სიახლეების ჩატვირთვა ვერ მოხერხდა (კოდი: ${res.status})`);
  }

  const data = await res.json();
  const articles = data.news || [];

  return articles.slice(0, limit).map((article: any) => ({
    id: article.id?.toString() || article.url || Math.random().toString(),
    title: article.title || 'Untitled',
    description: article.text?.substring(0, 100) + '...' || article.summary || 'No description available',
    imageUrl: article.image || null,
    publishedAt: article.publish_date || new Date().toISOString(),
    sourceUrl: article.url || '#',
    sourceName: article.source_country || 'World News',
  }));
}