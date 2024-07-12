import { IBookWithoutAuthorsAndGenres } from "./books.interface";

export interface IGenre {
  id: number;
  title: string;
  description: string;
}

export type IGenreWithBooks = IGenre & {
  books: IBookWithoutAuthorsAndGenres[];
};
export type OptionalGenre = IGenre | null;
