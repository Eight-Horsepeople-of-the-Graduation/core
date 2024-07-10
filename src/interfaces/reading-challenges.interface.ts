import {
  IReadingChallengeBook,
} from "./books.interface";

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
  books: IReadingChallengeBook[];
};

export type OptionalReadingChallengeWithBooks = (IReadingChallenge & {
  books: IReadingChallengeBook[];
}) | null;
