import { IAuthor } from "./authors.interface";
import { IGenre } from "./genres.interface";
export interface IBook {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publishDate: Date;
  format: "PAPERBACK" | "HARDCOVER" | "EBOOK";
  language: string;
  country: string;
  rating: number | null;
  numOfPages: number;
  pdfLink: string | null;
  coverPicture: string | null;
  authors: IAuthor[];
  genres: IGenre[];
}

export type IBookWithoutAuthorsAndGenres = Omit<IBook, "authors" | "genres">;
export type IReadingChallengeBook = Pick<IBook, "id" | "title" | "coverPicture" | "authors" | "rating">;
export type OptionalBook = IBook | null;
export const SelectReadingChallengeBook = {
  id: true,
  title: true,
  coverPicture: true,
  authors: true,
  rating: true,
};
