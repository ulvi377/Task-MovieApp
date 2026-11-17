import { initialMovies, Movie } from "@/data/movies";
import { createContext, ReactNode, useContext, useState } from "react";

type MoviesContextType = {
  movies: Movie[];
  savedMovies: Movie[];
  addMovie: (movie: Omit<Movie, "id" | "saved">) => void;
  toggleSave: (id: string) => void;
  getMovie: (id: string) => Movie | undefined;
};

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export function MoviesProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const addMovie = (movie: Omit<Movie, "id" | "saved">) => {
    setMovies((prev) => [
      { ...movie, id: Date.now().toString(), saved: false },
      ...prev,
    ]);
  };

  const toggleSave = (id: string) => {
    setMovies((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item,
      ),
    );
  };

  const getMovie = (id: string) => movies.find((item) => item.id === id);

  const savedMovies = movies.filter((item) => item.saved);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        savedMovies,
        addMovie,
        toggleSave,
        getMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext);

  if (!context) {
    throw new Error("useMovies must be inside MoviesProvider");
  }

  return context;
}
