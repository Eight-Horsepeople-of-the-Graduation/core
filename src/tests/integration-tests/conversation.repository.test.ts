import { Format } from "@dtos";
import prismaClient from "@utils/prisma";
import conversationsRepository from "@repositories/conversations.repository";

describe("Conversation Repository Integration Tests", () => {
  beforeEach(async () => {
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
  });
  afterEach(async () => {
    await prismaClient.conversation.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.book.deleteMany();
  });
  afterAll(async () => {
    await prismaClient.$disconnect();
  });
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
  });

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
  });

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
  });
});
