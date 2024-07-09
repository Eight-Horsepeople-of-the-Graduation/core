import { IBook, IBookWithoutAuthorsAndGenres } from "./books.interface";
import { BookshelfUser, IUser } from "./users.interface";

export interface IBookshelf {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  privacy: "PRIVATE" | "PUBLIC";
  userId: number;
  books: IBookWithoutAuthorsAndGenres[];
  _count: {
    books: number;
  };
}

export type IBookshelfWithUser = IBookshelf & { user: BookshelfUser };
export type OptionalBookshelf = IBookshelf | null;
export type IBookshelfWithoutBooks = Omit<IBookshelf, "books" | "_count">;
