import { Image } from "react-native";

export type MovieTag = "2D" | "3D" | "IMAX" | "4D";

export type Movie = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: MovieTag[];
  genre: string[];
  imdbRating: number;
  duration: string;
  rotten: string;
  saved: boolean;
};

export const ALL_TAGS: MovieTag[] = ["2D", "3D", "IMAX", "4D"];

export const ALL_GENRES = [
  "Action",
  "Adventure",
  "Crime",
  "Drama",
  "Comedy",
  "Horror",
  "Sci-Fi",
  "Thriller",
];

const poster = (source: number) => Image.resolveAssetSource(source)?.uri ?? "";

export const initialMovies: Movie[] = [
  {
    id: "1",
    name: "Inception",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea in the mind of a CEO.",
    imageUrl: poster(require("../../assets/images/movies/inception.jpg")),
    tags: ["2D", "IMAX"],
    genre: ["Action", "Sci-Fi"],
    imdbRating: 8.8,
    duration: "2h 28m",
    rotten: "87%",
    saved: true,
  },
  {
    id: "2",
    name: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: poster(require("../../assets/images/movies/interstellar.jpg")),
    tags: ["2D", "3D", "IMAX"],
    genre: ["Adventure", "Drama"],
    imdbRating: 8.6,
    duration: "2h 49m",
    rotten: "72%",
    saved: true,
  },
  {
    id: "3",
    name: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal mastermind who plunges Gotham City into anarchy and forces the hero to confront his limits.",
    imageUrl: poster(require("../../assets/images/movies/dark-knight.jpg")),
    tags: ["2D", "IMAX", "4D"],
    genre: ["Action", "Crime"],
    imdbRating: 9.0,
    duration: "2h 32m",
    rotten: "94%",
    saved: true,
  },
  {
    id: "4",
    name: "Avatar",
    description:
      "A marine on an alien planet becomes torn between following orders and protecting the world he feels is his home.",
    imageUrl: poster(require("../../assets/images/movies/avatar.jpg")),
    tags: ["2D", "3D", "IMAX", "4D"],
    genre: ["Action", "Adventure", "Sci-Fi"],
    imdbRating: 7.9,
    duration: "2h 42m",
    rotten: "82%",
    saved: false,
  },
];
