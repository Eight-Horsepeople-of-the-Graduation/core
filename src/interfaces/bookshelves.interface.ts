import { IBook } from "./books.interface";
import { IUser } from "./users.interface";
import { Privacy } from "../dtos";

export interface IBookshelf {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
  privacy: Privacy;
  userId: number;
  books: IBook[];
  user: IUser;
  _count: {
    books: number;
  };
}
