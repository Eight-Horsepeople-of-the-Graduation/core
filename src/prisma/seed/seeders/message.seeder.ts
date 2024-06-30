import prismaClient from "../../../utils/prisma";
import { data } from "../data/messagesData.json";

export async function seedMessages() {
  console.log(
    "-----------------------------Seeding Messages---------------------------"
  );
  const conversations = await prismaClient.conversation.findMany();

  for (const conversation of conversations) {
    let convStartDate = new Date();
    const bookId = conversation.bookId;
    for (const message of data) {
      if (message.bookId !== bookId) continue;
      await prismaClient.message.create({
        data: {
          content: message.content,
          conversationId: conversation.id,
          role: message.role,
          createdOn: convStartDate,
        },
      });
      convStartDate.setMinutes(convStartDate.getMinutes() + 1);
    }
  }

  console.log(`Added messages to all conversations..`);
}
