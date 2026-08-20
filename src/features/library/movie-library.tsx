import { createContext, useContext, useState } from 'react';

interface MovieLibrary {
  favouriteIds: number[];
  pendingIds: number[];
  addFavourite: (movieId: number) => void;
  addPending: (movieId: number) => void;
}

const MovieLibraryContext = createContext<MovieLibrary | null>(null);

const initialFavouriteIds = [103, 104];
const initialPendingIds = [101, 102, 103];

export function MovieLibraryProvider({ children }: React.PropsWithChildren) {
  const [favouriteIds, setFavouriteIds] = useState(initialFavouriteIds);
  const [pendingIds, setPendingIds] = useState(initialPendingIds);

  function addFavourite(movieId: number): void {
    setFavouriteIds((currentIds) => (currentIds.includes(movieId) ? currentIds : [...currentIds, movieId]));
  }

  function addPending(movieId: number): void {
    setPendingIds((currentIds) => (currentIds.includes(movieId) ? currentIds : [...currentIds, movieId]));
  }

  return (
    <MovieLibraryContext.Provider value={{ favouriteIds, pendingIds, addFavourite, addPending }}>
      {children}
    </MovieLibraryContext.Provider>
  );
}

export function useMovieLibrary(): MovieLibrary {
  const library = useContext(MovieLibraryContext);

  if (!library) throw new Error('useMovieLibrary must be used within MovieLibraryProvider.');

  return library;
}
