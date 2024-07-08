import { IBook, IBookWithoutAuthorsAndGenres } from "./books.interface";
import { Duration } from "../dtos";

export interface IReadingChallenge {
  id: number;
  title: string | null;
  type: "WEEKLY" | "MONTHLY" | "ANNUAL";
  startDate: Date;
  endDate: Date | null;
  progress: number;
  goal: number;
  timeframe: string;
  hasEnded: boolean;
  userId: number;
}

export type IReadingChallengeWithBooks = IReadingChallenge & {
  books: IBookWithoutAuthorsAndGenres[];
};
