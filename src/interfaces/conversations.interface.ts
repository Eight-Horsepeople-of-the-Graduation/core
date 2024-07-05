import { IMessage } from "./messages.interface";

export interface IConversation {
  id: number;
  createdOn: Date;
  retriever: string;
  memory: string;
  llm: string;
  bookId: number;
  userId: number;
  messages: IMessage[];
}
