import prismaClient from "@common/utils/prisma";
import { Format } from "@modules/books/book-format.enum";
import conversationsRepository from "@modules/conversations/conversations.repository";

describe("Conversation Repository Integration Tests", () => {
  beforeAll(async () => {
    await prismaClient.book.create({
      data: {
        title: "Test Book",
        isbn: "0802124739",
        description: "This is a test book",
        publishDate: new Date(),
        format: Format.HARDCOVER,
        language: "English",
        country: "United States",
        numOfPages: 100,
        authors: {
          create: {
            name: "Test Author",
          },
        },
      },
    });

    await prismaClient.user.create({
      data: {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: "MALE",
      },
    });

    const validUserId = await prismaClient.user.findFirst();
    const validBookId = await prismaClient.book.findFirst();
    const userId = validUserId.id;
    const bookId = validBookId.id;
    await prismaClient.conversation.create({
      data: {
        retriever: "Conversation retriever",
        memory: " test conversation memory ",
        llm: " test conversation llm ",
        bookId: bookId,
        userId: userId,
      },
    });
    const validConversationId = await prismaClient.conversation.findFirst();
    const conversationId = validConversationId.id;
    await prismaClient.message.create({
      data: {
        content: "Test message",
        role: "human",
        conversation: {
          connect: {
            id: conversationId,
          },
        },
      },
    });
  }, 20000);

  afterAll(async () => {
    await prismaClient.conversation.deleteMany();
    await prismaClient.message.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.book.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Conversation_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Message_id_seq" RESTART WITH 1`;
    await prismaClient.$disconnect();
  }, 20000);
  it("should get conversation by id ", async () => {
    const conversation = await prismaClient.conversation.findFirst();
    const conversationId = conversation.id;
    const conversations =
      await conversationsRepository.getConversationById(conversationId);
    const foundConversation = await prismaClient.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: true,
      },
    });

    expect(foundConversation).toMatchObject(conversations);
  }, 20000);

  it("should create a new message", async () => {
    const conversation = await prismaClient.conversation.findFirst();
    const conversationId = conversation.id;
    const messageData = {
      content: "Test message",
      role: "USER",
    };
    const message = await conversationsRepository.createMessage(
      messageData,
      conversationId
    );
    const foundMessage = await prismaClient.message.findUnique({
      where: {
        id: message.id,
      },
    });

    expect(foundMessage).toMatchObject(message);
  }, 20000);

  it("should get conversation by bookId and userId", async () => {
    const conversation = await prismaClient.conversation.findFirst();
    const bookId = conversation.bookId;
    const userId = conversation.userId;
    const conversations =
      await conversationsRepository.getConversationByUserAndBook(
        bookId,
        userId
      );
    const foundConversation = await prismaClient.conversation.findFirst({
      where: {
        bookId: bookId,
        userId: userId,
      },
      include: {
        messages: true,
      },
    });

    expect(foundConversation).toMatchObject(conversations);
  }, 20000);

  it("should delete conversation", async () => {
    const validBookId = await prismaClient.book.findFirst();
    const validUserId = await prismaClient.user.findFirst();
    const Conversation = await prismaClient.conversation.findFirst();
    const conversationId = Conversation.id;
    const userId = validUserId.id;
    const bookId = validBookId.id;
    await conversationsRepository.deleteConversation(bookId, userId);
    const foundConversation = await prismaClient.message.findUnique({
      where: {
        id: conversationId,
      },
    });

    expect(foundConversation).toBeNull();
  }, 20000);

  it("get Messages By ConversationId ", async () => {
    const conversation = await prismaClient.conversation.findFirst();
    const conversationId = conversation.id;
    const messages =
      await conversationsRepository.getMessagesByConversationId(conversationId);
    const foundMessages = await prismaClient.message.findMany({
      where: {
        conversationId: conversationId,
      },
    });

    expect(foundMessages).toHaveLength(messages.length);
  }, 20000);
  // it("should create a conversation", async () => {
  //   const validBookId = await prismaClient.book.findFirst();
  //   const validUserId = await prismaClient.user.findFirst();
  //   const userId = validUserId.id;
  //   const bookId = validBookId.id;

  //   const conversationData = {
  //     retriever: "Conversation retriever",
  //     memory: " test conversation memory ",
  //     llm: " test conversation llm ",
  //     bookId: bookId,
  //     userId: userId,
  //   };
  //   const conversation =
  //     await conversationsRepository.createConversation(conversationData);
  //   const foundConversation = await prismaClient.conversation.findUnique({
  //     where: {
  //       id: conversation.id,
  //     },
  //     include: {
  //       messages: true,
  //     },
  //   });

  //   expect(foundConversation).toMatchObject(conversation);
  // });
});
