export interface Movie {
  id: number;
  title: string;
  year: number;
  runtime: string;
  director: string;
  genres: string[];
  overview: string;
  tasteReason: string;
  theatre: string | null;
  streaming: string | null;
  posterUrl: string;
}

export const movies: Movie[] = [
  {
    id: 101,
    title: 'The Holdovers',
    year: 2023,
    runtime: '2h 13m',
    director: 'Alexander Payne',
    genres: ['Comedy', 'Drama'],
    overview:
      'A curmudgeonly instructor remains at school over the winter break with a student who has nowhere else to go.',
    tasteReason: 'Because you loved quiet character dramas',
    theatre: 'In theatres near you · Barcelona',
    streaming: 'Prime Video',
    posterUrl: 'https://image.tmdb.org/t/p/w500/VHSzNBTwxV8vh7wylo7O9CLdac.jpg',
  },
  {
    id: 102,
    title: 'All of Us Strangers',
    year: 2023,
    runtime: '1h 45m',
    director: 'Andrew Haigh',
    genres: ['Drama', 'Fantasy'],
    overview: 'A screenwriter is drawn back into a relationship with a mysterious neighbour and his childhood home.',
    tasteReason: 'A tender, intimate story with emotional depth',
    theatre: null,
    streaming: 'Disney+',
    posterUrl: 'https://image.tmdb.org/t/p/w500/aviJMFZSnnCAsiS1dW0s2lAZ0Lm.jpg',
  },
  {
    id: 103,
    title: 'Past Lives',
    year: 2023,
    runtime: '1h 46m',
    director: 'Celine Song',
    genres: ['Drama', 'Romance'],
    overview:
      'Two childhood friends reconnect in New York after decades apart and confront the paths their lives have taken.',
    tasteReason: 'You respond to intimate stories about connection',
    theatre: 'In theatres near you · Barcelona',
    streaming: 'Netflix',
    posterUrl: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
  },
  {
    id: 104,
    title: 'Decision to Leave',
    year: 2022,
    runtime: '2h 18m',
    director: 'Park Chan-wook',
    genres: ['Mystery', 'Romance'],
    overview:
      'A detective investigating a death in the mountains finds himself becoming entangled with the victim’s wife.',
    tasteReason: 'A precise, romantic mystery for your director picks',
    theatre: null,
    streaming: 'MUBI',
    posterUrl: 'https://image.tmdb.org/t/p/w500/6T50O5eCwLgmTn0yF5KMF43fGMA.jpg',
  },
  {
    id: 105,
    title: 'Aftersun',
    year: 2022,
    runtime: '1h 42m',
    director: 'Charlotte Wells',
    genres: ['Drama'],
    overview:
      'A woman reflects on a holiday she took with her father twenty years earlier, and the moments she missed.',
    tasteReason: 'A quiet, observant favourite in the making',
    theatre: null,
    streaming: 'MUBI',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4Ke48hPZt5DbjNfR3w5wibQmR9x.jpg',
  },
  {
    id: 106,
    title: 'Anatomy of a Fall',
    year: 2023,
    runtime: '2h 32m',
    director: 'Justine Triet',
    genres: ['Crime', 'Drama'],
    overview:
      'A writer is put on trial after her husband falls from a chalet window, leaving their son as the key witness.',
    tasteReason: 'For your taste in smart, tense European dramas',
    theatre: 'In theatres near you · Barcelona',
    streaming: null,
    posterUrl: 'https://image.tmdb.org/t/p/w500/kQs6keheMwCxJxrzV83VUwFtHkB.jpg',
  },
];

export function movieById(id: number): Movie {
  const movie = movies.find((candidate) => candidate.id === id);

  if (!movie) throw new Error(`Movie ${id} does not exist.`);

  return movie;
}
