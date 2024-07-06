export interface IMessage {
  id: number;
  createdOn: Date;
  role: string;
  content: string;
  conversationId: number;
}

export type IMessageWithoutConversationId = Omit<IMessage, "conversationId">;
