import prismaClient from "../../../utils/prisma";
import { seedConfig } from "./config";

export async function seedConversations() {
  const userCount = seedConfig.userCount;
    console.log("-----------------------------Seeding Conversations---------------------")
  for (let i = 1; i <= userCount; i++) {
    for (let j = i + 1; j <= userCount; j++) {
      await prismaClient.conversation.createMany({
        data: [
          {
            retriever: "Pinecone",
            memory: "Buffer Memory",
            llm: "OpenAI",
            bookId: 1,
            userId: i,
          },
          {
            retriever: "Pinecone",
            memory: "Buffer Memory",
            llm: "OpenAI",
            bookId: 2,
            userId: i,
          },
        ],
      });
    }
  }

    console.log(`Added 2 conversations for all ${userCount} users..`);
}
