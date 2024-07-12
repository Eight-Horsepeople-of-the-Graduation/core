import { Format } from "@modules/books/dtos/books.dto";
import {
  createReview,
  deleteReview,
  getReviewById,
  updateReviewDetails,
  updateReviewRating,
} from "@modules/reviews/reviews.controller";
import reviewsService from "@modules/reviews/reviews.service";
import { Request, Response } from "express";
describe("Reviews Controller Unit Tests", () => {
  describe("get review by id ", () => {
    // Successfully retrieves a review by a valid ID
    it("should return the review when given a valid ID", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const review = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };

      jest.spyOn(reviewsService, "getReviewById").mockResolvedValue(review);

      await getReviewById(req, res);

      expect(reviewsService.getReviewById).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(review);
    });
    // Handles non-numeric review IDs gracefully
    it("should handle non-numeric review IDs gracefully", async () => {
      const req = { params: { id: "abc" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;

      jest.spyOn(reviewsService, "getReviewById").mockResolvedValue(null);

      await getReviewById(req, res);

      expect(reviewsService.getReviewById).toHaveBeenCalledWith(NaN);
      expect(res.send).toHaveBeenCalledWith(null);
    });
  });
  describe("create review", () => {
    // Successfully creates a review when valid data is provided
    it("should create a review when valid data is provided", async () => {
      const req = {
        body: {
          title: "Great Book",
          content: "I really enjoyed reading this book.",
          rating: 5,
          userId: "user123",
          bookId: "book123",
        },
      } as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      } as unknown as Response;

      const newReview = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };

      jest.spyOn(reviewsService, "createReview").mockResolvedValue(newReview);

      await createReview(req, res);

      expect(reviewsService.createReview).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newReview);
    });
  });
  describe("update review details", () => {
    // Successfully updates a review when valid review ID and update data are provided
    it("should update the review when valid review ID and update data are provided", async () => {
      const req = {
        params: { id: "1" },
        body: { title: "Updated Review Title" },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedReview = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };
      jest
        .spyOn(reviewsService, "updateReviewDetails")
        .mockResolvedValue(updatedReview);

      await updateReviewDetails(req, res);

      expect(reviewsService.updateReviewDetails).toHaveBeenCalledWith(
        req.body,
        1
      );
      expect(res.send).toHaveBeenCalledWith(updatedReview);
    });
  });
  describe("update review rating", () => {
    // Successfully updates review rating when valid review ID and update data are provided
    it("should successfully update review rating when valid review ID and update data are provided", async () => {
      const req = {
        params: { id: "1" },
        body: { rating: 5 },
      } as unknown as Request;
      const res = {
        send: jest.fn(),
      } as unknown as Response;

      const updatedReview = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };
      jest
        .spyOn(reviewsService, "updateReviewRating")
        .mockResolvedValue(updatedReview);

      await updateReviewRating(req, res);

      expect(reviewsService.updateReviewRating).toHaveBeenCalledWith(
        req.body,
        1
      );
      expect(res.send).toHaveBeenCalledWith(updatedReview);
    });
  });
  describe("delete review", () => {
    // Successfully deleting a review by valid ID
    it("should return the deleted review when a valid ID is provided", async () => {
      const req = { params: { id: "1" } } as unknown as Request;
      const res = { send: jest.fn() } as unknown as Response;
      const mockDeletedReview = {
        userId: 1,
        bookId: 1,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 1,
        createdAt: new Date("2021-01-01"),
        user: {
          username: "testuseername",
          email: "ASDASD",
          name: "asdasdasd",
          profilePicture: "test.jpg",
        },
        book: {
          title: "Test Book",
          isbn: "0802124739",
          description: "This is a test book",
          publishDate: new Date(),
          format: Format.HARDCOVER,
          language: "English",
          country: "United States",
          numOfPages: 100,
          id: 1,
          coverPicture: "test.jpg",
          rating: 5,
          pdfLink: "https://test.com",
          genres: {
            connect: {
              id: 1,
              title: "Test Genre",
            },
          },
          authors: {
            connect: {
              id: 1,
              name: "Test Author",
            },
          },
        },
      };

      jest
        .spyOn(reviewsService, "deleteReview")
        .mockResolvedValue(mockDeletedReview);

      await deleteReview(req, res);

      expect(reviewsService.deleteReview).toHaveBeenCalledWith(1);
      expect(res.send).toHaveBeenCalledWith(mockDeletedReview);
    });
  });
});
