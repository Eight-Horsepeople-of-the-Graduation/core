import { Format, Privacy, Gender,Duration, } from "../dtos";

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
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  country: string;
  gender: Gender;
  birthDate: Date | null;
  joinDate: Date;
  profilePicture: string | null;
  isAdmin: boolean;
}
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

export interface IReadingChallenge {
  "id": number,
  "title": string,
  "type": Duration,
  "startDate": Date,
  "progress": number,
  "userId": number,
  "books": IBook[],
  "_count": {
    "books": number
  }
}

export interface IMessage {
  "id": number,
  "createdOn": Date,
  "role": string,
  "content": string,
  "conversationId": number
}
export interface IConversation {
  "id": number,
  "createdOn": Date,
  "retriever": string,
  "memory": string,
  "llm": string,
  "bookId": number,
  "userId": number,
  "messages": IMessage[]
}
