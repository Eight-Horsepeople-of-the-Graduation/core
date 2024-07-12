import { HttpStatus } from "@common/enums/http-status.enum";
import { da } from "@faker-js/faker";
import {
  chat,
  deleteConversation,
  getConversationByUserAndBook,
} from "@modules/conversations/conversations.controller";
import conversationsService from "@modules/conversations/conversations.service";
import { Request, Response } from "express";
describe("conversation controller Unit Tests", () => {
  describe("getConversationByUserAndBook", () => {
    // Valid userId and bookId return a conversation
    it("should return a conversation when userId and bookId are valid", async () => {
      const req = {
        params: {
          userId: "1",
          bookId: "2",
        },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const mockConversation = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId: 2,
        userId: 1,
      };
      jest
        .spyOn(conversationsService, "checkUserAndBook")
        .mockResolvedValueOnce(Promise.resolve());
      jest
        .spyOn(conversationsService, "getConversationByUserAndBook")
        .mockResolvedValueOnce(mockConversation);

      await getConversationByUserAndBook(req, res);

      expect(conversationsService.checkUserAndBook).toHaveBeenCalledWith(1, 2);
      expect(
        conversationsService.getConversationByUserAndBook
      ).toHaveBeenCalledWith(1, 2);
      expect(res.send).toHaveBeenCalledWith(mockConversation);
    });
  });
  describe("chat", () => {
    // Valid bookId and userId should return status 200 with an answer
    it("should return status 200 with an answer when bookId and userId are valid", async () => {
      const req = {
        params: { bookId: "1", userId: "1" },
        body: { message: "Hello" },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(conversationsService, "checkUserAndBook")
        .mockResolvedValueOnce(Promise.resolve());
      jest.spyOn(conversationsService, "chat").mockResolvedValueOnce("Answer");

      await chat(req, res);

      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith({ answer: "Answer" });
    });
  });
  describe("deleteConversation", () => {
    // Successfully deletes a conversation when valid userId and bookId are provided
    it("should delete the conversation when valid userId and bookId are provided", async () => {
      const req = {
        params: {
          bookId: "1",
          userId: "1",
        },
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      jest
        .spyOn(conversationsService, "checkUserAndBook")
        .mockResolvedValueOnce(Promise.resolve());
      const mockConversation = {
        id: 1,
        messages: [] as any[],
        createdOn: new Date(),
        bookId: 2,
        userId: 1,
      };
      jest
        .spyOn(conversationsService, "deleteConversation")
        .mockResolvedValueOnce(mockConversation);

      await deleteConversation(req, res);

      expect(conversationsService.checkUserAndBook).toHaveBeenCalledWith(1, 1);
      expect(conversationsService.deleteConversation).toHaveBeenCalledWith(
        1,
        1
      );
      expect(res.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(res.send).toHaveBeenCalledWith(mockConversation);
    });
  });
});
