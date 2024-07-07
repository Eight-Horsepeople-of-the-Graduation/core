import { IBook } from "./books.interface";
import { Duration } from "../dtos";

export interface IReadingChallenge {
  id: number;
  title: string;
  type: Duration;
  startDate: Date;
  progress: number;
  userId: number;
  books: IBook[];
  _count: {
    books: number;
  };
}
