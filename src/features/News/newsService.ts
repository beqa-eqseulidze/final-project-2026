import type { NewsItem } from './types';

const API_KEY = 'aeYu-errqXHintjDRqhs5zGCNfhg3zF6-icInDnPa2eAjqxu';
const BASE_URL = 'https://api.currentsapi.services/v1/latest-news?language=en&page_size=20';

export async function fetchLatestNews(limit = 10): Promise<NewsItem[]> {
  let allArticles: any[] = [];
  let page = 1;
  const maxPages = 5; // მაქსიმუმ 5 გვერდი, რომ უსასრულოდ არ ტრიალდეს

  // ვცდილობთ მოვაგროვოთ ზუსტად 10 სურათიანი სტატია
  while (allArticles.length < limit && page <= maxPages) {
    const res = await fetch(`${BASE_URL}&page=${page}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` },
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('Currents API Error:', res.status, errorBody);
      throw new Error(`სიახლეები ვერ ჩაიტვირთა (კოდი: ${res.status})`);
    }

    const data = await res.json();
    const articles = data.news || [];

    // 🆕 ვფილტრავთ მხოლოდ მათ, რომლებსაც აქვთ image ველი
    const withImages = articles.filter((a: any) => a.image);
    
    // ვამატებთ ახლებს, რომ არ გავიმეოროთ
    withImages.forEach((article: any) => {
      if (!allArticles.find((existing) => existing.id === article.id)) {
        allArticles.push(article);
      }
    });

    page++;
  }

  // ვიღებთ ზუსტად 10-ს (ან limit-ს) და ვაბრუნებთ NewsItem ფორმატში
  return allArticles.slice(0, limit).map((article: any) => ({
    id: article.id || article.url || Math.random().toString(),
    title: article.title || 'სათაური არ არის',
    description: article.description || 'აღწერა არ არის',
    imageUrl: article.image, // აქ უკვე 100% დარწმუნებული ვართ, რომ სურათი აქვს
    publishedAt: article.published || new Date().toISOString(),
    sourceUrl: article.url || '#',
    sourceName: 'Currents News',
  }));
}