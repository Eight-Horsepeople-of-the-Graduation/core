import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { Format } from "@modules/books/book-format.enum";
import booksRepository from "@modules/books/books.repository";
import conversationsRepository from "@modules/conversations/conversations.repository";
import {
  checkUserAndBook,
  createConversation,
  createMessage,
  deleteConversation,
  getConversationByUserAndBook,
  getMessagesByConversationId,
} from "@modules/conversations/conversations.service";
import { Gender } from "@modules/users/user-gender.enum";
import usersRepository from "@modules/users/users.repository";

describe("ConversationService unit tests", () => {
  describe("checkUserAndBook", () => {
    // Successfully retrieves user and book when both exist
    it("should retrieve user and book when both exist", async () => {
      const mockUser = {
        username: "testuseername",
        email: "asmdask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: Gender.MALE,
        birthDate: new Date("1990-01-01"),
        id: 1,
        refreshToken: "asdasdasd",
        joinDate: new Date("2021-01-01T00:00:00.000Z"),
        profilePicture: "test.jpg",
        isAdmin: false,
      };
      const mockBook = {
        id: 1,
        title: "The Hobbit",
        isbn: "978-3-16-148410-0",
        description: "A fantasy novel by J.R.R. Tolkien",
        publishDate: new Date("1954-07-29"),
        format: Format.PAPERBACK,
        language: "English",
        country: "United Kingdom",
        numOfPages: 310,
        pdfLink: "https://www.google.com",
        coverPicture: "https://www.google.com",
        rating: 4.5,
        authors: [
          {
            id: 1,
            name: "Tolkien",
          },
        ],
        genres: [
          {
            id: 1,
            title: "Fantasy",
            description: "not real",
          },
        ],
      };

      jest.spyOn(usersRepository, "getUserById").mockResolvedValue(mockUser);
      jest.spyOn(booksRepository, "getBookById").mockResolvedValue(mockBook);

      await expect(checkUserAndBook(1, 1)).resolves.not.toThrow();

      expect(usersRepository.getUserById).toHaveBeenCalledWith(1);
      expect(booksRepository.getBookById).toHaveBeenCalledWith(1);
    });
  });

  describe("createConversation", () => {
    // Successfully creates a conversation with valid data
    it("should create a conversation when valid data is provided", async () => {
      const mockConversationData = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId: 1,
        userId: 1,
      };

      const mockConversation = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId: 1,
        userId: 1,
        retriever: "",
        memory: "",
        llm: "",
      };

      jest
        .spyOn(conversationsRepository, "createConversation")
        .mockResolvedValue(mockConversation);

      const result = await createConversation({
        retriever: "",
        memory: "",
        llm: "",
        ...mockConversationData,
      });

      expect(result).toEqual(mockConversation);
      expect(conversationsRepository.createConversation).toHaveBeenCalledWith(
        result
      );
    });
  });
  describe("createMessage", () => {
    // Successfully create a message with valid data and conversation ID
    it("should create a message when valid data and conversation ID are provided", async () => {
      const messageData = { content: "Hello World", role: "human" };
      const conversationId = 1;
      const expectedMessage = {
        id: 1,
        createdOn: new Date(),
        role: "human",
        content: "Hello World",
        conversationId: 1,
      };

      jest
        .spyOn(conversationsRepository, "createMessage")
        .mockResolvedValue(expectedMessage);

      const result = await createMessage(messageData, conversationId);

      expect(result).toEqual(expectedMessage);
      expect(conversationsRepository.createMessage).toHaveBeenCalledWith(
        messageData,
        conversationId
      );
    });
  });
  describe("getMessagesByConversationId", () => {
    // Retrieves messages for a valid conversation ID
    it("should retrieve messages when given a valid conversation ID", async () => {
      const mockMessages = [
        { id: 1, text: "Hello", role: "human" } as unknown as HumanMessage,
        { id: 2, text: "Hi", role: "Ai" } as unknown as AIMessage,
      ];
      const conversationId = 1;

      jest
        .spyOn(conversationsRepository, "getMessagesByConversationId")
        .mockResolvedValue(mockMessages);

      const result = await getMessagesByConversationId(conversationId);

      expect(result).toEqual(mockMessages);
      expect(
        conversationsRepository.getMessagesByConversationId
      ).toHaveBeenCalledWith(conversationId);
    });
  });
  describe("getConversationByUserAndBook", () => {
    it("should retrieve existing conversation when conversation exists for given user and book", async () => {
      const bookId = 1;
      const userId = 1;
      const mockConversation = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId,
        userId,
      };

      jest
        .spyOn(conversationsRepository, "getConversationByUserAndBook")
        .mockResolvedValue(mockConversation);

      const result = await getConversationByUserAndBook(bookId, userId);

      expect(
        conversationsRepository.getConversationByUserAndBook
      ).toHaveBeenCalledWith(bookId, userId);
      expect(result).toEqual(mockConversation);
    });
  });
  describe("deleteConversation", () => {
    // Successfully deletes a conversation when valid bookId and userId are provided
    it("should delete the conversation when valid bookId and userId are provided", async () => {
      const bookId = 1;
      const userId = 1;
      const mockConversation = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId,
        userId,
      };

      jest
        .spyOn(conversationsRepository, "deleteConversation")
        .mockResolvedValue(mockConversation);

      const result = await deleteConversation(bookId, userId);

      expect(conversationsRepository.deleteConversation).toHaveBeenCalledWith(
        bookId,
        userId
      );
      expect(result).toEqual(mockConversation);
    });
  });
});
