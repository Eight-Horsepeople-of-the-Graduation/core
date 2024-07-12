import booksService from "@modules/books/books.service";
import reviewsRepository from "@modules/reviews/reviews.repository";
import {
  createReview,
  deleteReview,
  getReviewById,
  updateReviewDetails,
  updateReviewRating,
} from "@modules/reviews/reviews.service";
import { Format } from "@prisma/client";

describe("Reviews Service Unit Tests", () => {
  describe("get review by id ", () => {
    // Retrieves a review by a valid review ID
    it("should return the review when the review ID is valid", async () => {
      const mockReview = {
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
        .spyOn(reviewsRepository, "getReviewById")
        .mockResolvedValue(mockReview);

      const result = await getReviewById(1);

      expect(result).toEqual(mockReview);
      expect(reviewsRepository.getReviewById).toHaveBeenCalledWith(1);
    });
  });
  describe("create review", () => {
    // Successfully creates a review with valid input
    it("should create a review when given valid input", async () => {
      const createdReviewDto = {
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

      jest.spyOn(booksService, "updateBookRating").mockResolvedValueOnce(null);
      jest
        .spyOn(reviewsRepository, "createReview")
        .mockResolvedValueOnce(createdReviewDto);

      const result = await createReview(createdReviewDto);

      expect(result).toEqual(createdReviewDto);
      expect(booksService.updateBookRating).toHaveBeenCalledWith(
        createdReviewDto.rating,
        createdReviewDto.bookId,
        true,
        expect.anything()
      );
      expect(reviewsRepository.createReview).toHaveBeenCalledWith(
        createdReviewDto,
        expect.anything()
      );
    });
  });
  describe("update review details", () => {
    // Successfully updates review details with valid data
    it("should update review details when valid data is provided", async () => {
      const updateReviewDetailsDto = {
        title: "Updated Title",
        content: "Updated Content",
      };
      const reviewId = 1;
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
        .spyOn(reviewsRepository, "updateReviewDetails")
        .mockResolvedValue(updatedReview);

      const result = await updateReviewDetails(
        updateReviewDetailsDto,
        reviewId
      );

      expect(result).toEqual(updatedReview);
      expect(reviewsRepository.updateReviewDetails).toHaveBeenCalledWith(
        updateReviewDetailsDto,
        reviewId
      );
    });
  });
  describe("update review rating", () => {
    // Successfully updates the review rating in the database
    it("should successfully update the review rating in the database when valid data is provided", async () => {
      const updateReviewDto = { rating: 5, bookId: 1 };
      const reviewId = 1;
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

      jest.spyOn(booksService, "updateBookRating").mockResolvedValueOnce(null);
      jest
        .spyOn(reviewsRepository, "updateReviewRating")
        .mockResolvedValueOnce(updatedReview);

      const result = await updateReviewRating(updateReviewDto, reviewId);

      expect(booksService.updateBookRating).toHaveBeenCalledWith(
        5,
        1,
        true,
        expect.anything()
      );
      expect(reviewsRepository.updateReviewRating).toHaveBeenCalledWith(
        updateReviewDto,
        reviewId,
        expect.anything()
      );
      expect(result).toEqual(updatedReview);
    });
  });
  describe("delete review", () => {
    // Successfully deletes a review by its ID
    it("should delete the review when the review ID exists", async () => {
      const reviewId = 1;
      const mockReview = {
        userId: 2,
        bookId: 2,
        rating: 5,
        description: "Great book",
        title: "Great book",
        id: 2,
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
        .spyOn(reviewsRepository, "getReviewById")
        .mockResolvedValue(mockReview);
      jest.spyOn(booksService, "updateBookRating").mockResolvedValue(null);
      jest
        .spyOn(reviewsRepository, "deleteReview")
        .mockResolvedValue(mockDeletedReview);

      const result = await deleteReview(reviewId);

      expect(result).toEqual(mockDeletedReview);
      expect(reviewsRepository.getReviewById).toHaveBeenCalledWith(reviewId);
      expect(booksService.updateBookRating).toHaveBeenCalledWith(
        mockReview.rating,
        mockReview.bookId,
        false,
        expect.anything()
      );
      expect(reviewsRepository.deleteReview).toHaveBeenCalledWith(
        reviewId,
        expect.anything()
      );
    });
  });
});
