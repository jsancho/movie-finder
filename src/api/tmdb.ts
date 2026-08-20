import { TMDB } from '@lorenzopant/tmdb';

const tmdbBearerToken = process.env.EXPO_PUBLIC_TMDB_BEARER_TOKEN?.trim();

export interface TrendingMovie {
  id: number;
  title: string;
}

function getTMDBClient(): TMDB {
  if (!tmdbBearerToken) {
    throw new Error('TMDB bearer token is not configured.');
  }

  return new TMDB('tmdbBearerToken');
}

export async function getTrendingMovies(): Promise<TrendingMovie[]> {
  const response = await getTMDBClient().trending.movies({ time_window: 'week' });

  return response.results.slice(0, 10).map(({ id, title }) => ({ id, title }));
}
