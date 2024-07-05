export interface IMessage {
  id: number;
  createdOn: Date;
  role: string;
  content: string;
  conversationId: number;
}
