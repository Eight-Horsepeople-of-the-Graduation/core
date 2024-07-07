import { IMessage, IMessageWithoutConversationId } from "./messages.interface";

export interface IConversation {
  id: number;
  createdOn: Date;
  bookId: number;
  userId: number;
  messages: IMessageWithoutConversationId[];
}

export type OptionalConversation = IConversation | null;