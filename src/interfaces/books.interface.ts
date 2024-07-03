import { Format } from "../dtos";
import { IAuthor } from "./authors.interface";
import { IGenre } from "./genres.interface";
export interface IBook {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publishDate: Date;
  format: Format;
  language: string;
  country: string;
  numOfPages: number;
  pdfLink: string | null;
  coverPicture: string | null;
  authors: IAuthor[];
  genres: IGenre[];
}
