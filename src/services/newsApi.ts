import { GNEWS_API_KEY } from '../config/apiKeys';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  sourceName: string;
}

export class ApiKeyMissingError extends Error {}

export async function fetchBusinessNews(): Promise<NewsArticle[]> {
  if (!GNEWS_API_KEY) {
    throw new ApiKeyMissingError('GNews API key missing');
  }

  const url =
    'https://gnews.io/api/v4/top-headlines' +
    `?category=business&lang=en&country=in&max=20&apikey=${GNEWS_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`News request failed (${res.status}): ${body.slice(0, 200)}`);
  }
  const json = await res.json();
  const articles = Array.isArray(json.articles) ? json.articles : [];

  return articles.map((a: any) => ({
    title: a.title ?? '',
    description: a.description ?? '',
    url: a.url ?? '',
    image: a.image ?? null,
    publishedAt: a.publishedAt ?? '',
    sourceName: a.source?.name ?? 'News',
  }));
}
