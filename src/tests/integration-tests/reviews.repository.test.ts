import prismaClient from "@common/utils/prisma";
import { Format } from "@modules/books/dtos/books.dto";
import reviewsRepository from "@modules/reviews/reviews.repository";
import e from "express";

describe("Reviews Repository Integration Tests", () => {
  beforeEach(async () => {
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

    const validUserId = await prismaClient.user.findFirst();
    const validBookId = await prismaClient.book.findFirst();
    const userId = validUserId.id;
    const bookId = validBookId.id;
    await prismaClient.review.create({
      data: {
        userId: userId,
        bookId: bookId,
        rating: 5,
        description: "Great book",
        title: "Great book",
      },
    });
  });
  afterEach(async () => {
    await prismaClient.review.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.book.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });
  it("should get review by book id ", async () => {
    const book = await prismaClient.book.findFirst();
    const reviews = await prismaClient.review.findMany({
      where: {
        bookId: book.id,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
        book: true,
      },
    });

    const review = await reviewsRepository.getReviewsByBookId(book.id);
    expect(reviews).toMatchObject(review);
  });

  it("should get reviews by user id", async () => {
    const user = await prismaClient.user.findFirst();
    const reviews = await prismaClient.review.findMany({
      where: {
        userId: user.id,
      },
      include: {
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
        book: true,
      },
    });
    const review = await reviewsRepository.getReviewsByUserId(user.id);
    expect(reviews).toMatchObject(review);
  });

  it("should get review by user id ", async () => {
    const user = await prismaClient.user.findFirst();
    const vaildReview = await prismaClient.review.findFirst();
    const reviews = await prismaClient.review.findUnique({
      where: {
        id: vaildReview.id,
        user: {
          id: user.id,
        },
      },
      include: {
        book: true,
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    const review = await reviewsRepository.getReviewByUserId(
      user.id,
      vaildReview.id
    );
    expect(reviews).toMatchObject(review);
  });

  it("should get review by id ", async () => {
    const vaildReview = await prismaClient.review.findFirst();
    const spcifiedReview = await prismaClient.review.findUnique({
      where: {
        id: vaildReview.id,
      },
      include: {
        book: true,
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    const review = await reviewsRepository.getReviewById(vaildReview.id);
    expect(spcifiedReview).toMatchObject(review);
  });

  it("should create a new review", async () => {
    await prismaClient.user.create({
      data: {
        username: "testuseername for review",
        email: "asmdasask@gmail.com",
        name: "asdasdasd",
        password: "asdasdasd",
        country: "adasdasdas",
        gender: "MALE",
      },
    });

    await prismaClient.book.create({
      data: {
        title: "Test Book for review",
        isbn: "08021242739",
        description: "This is a test book",
        publishDate: new Date("2021-09-01T00:00:00Z"),
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
    const validBookId = await prismaClient.book.findMany({
      where: { title: "Test Book for review" },
    });
    const validUserId = await prismaClient.user.findMany({
      where: { username: "testuseername for review" },
    });

    const userid = validUserId[0].id;
    const bookid = validBookId[0].id;

    const reviewData = {
      userId: userid,
      bookId: bookid,
      rating: 5,
      description: "Great book 432",
      title: "Great book 1231",
    };
    const review = await reviewsRepository.createReview(reviewData);
    const createdReview = await prismaClient.review.findUnique({
      where: {
        id: review.id,
      },
      include: {
        book: true,
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    expect(review).toMatchObject(createdReview);
  });
  it("should update review details", async () => {
    const validReviewId = await prismaClient.review.findFirst();
    const reviewData = {
      title: "Great book 1231",
      description: "Great book 432",
    };
    const review = await reviewsRepository.updateReviewDetails(
      reviewData,
      validReviewId.id
    );
    const updatedReview = await prismaClient.review.findUnique({
      where: {
        id: validReviewId.id,
      },
      include: {
        book: true,
        user: {
          select: {
            username: true,
            name: true,
            profilePicture: true,
          },
        },
      },
    });
    expect(review).toMatchObject(updatedReview);
  });

  it("should delete review", async () => {
    const validReviewId = await prismaClient.review.findFirst();
    await reviewsRepository.deleteReview(validReviewId.id);
    const review = await prismaClient.review.findUnique({
      where: {
        id: validReviewId.id,
      },
    });
    expect(review).toBeNull();
  });
  it("should update review rating", async () => {
    const validReviewId = await prismaClient.review.findFirst();

    const validBookId = await prismaClient.book.findFirst();

    const reviewData = {
      rating: 4,
      bookId: validBookId.id,
    };
    const review = await reviewsRepository.updateReviewRating(
      reviewData,
      validReviewId.id
    );
    const updatedReview = await prismaClient.review.findUnique({
      where: {
        id: validReviewId.id,
      },
    });
    expect(review).toMatchObject(updatedReview);
  });
});
