import { Format } from "@dtos";
import booksRepository from "@repositories/books.repository";
import readingChallengesRepository from "@repositories/reading-challenges.repository";
import prismaClient from "@utils/prisma";
import { count } from "console";
import { get } from "lodash";

describe("Books Repository Integration Tests", () => {
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
    await prismaClient.author.create({
      data: {
        name: "Test Author",
      },
    });

    await prismaClient.genre.create({
      data: {
        title: "Test Genre",
        description: "This is a test genre",
      },
    });

    const getValidAuthorId = async () => {
      const author = await prismaClient.author.findFirst();
      return author.id;
    };
    const validAuthorId = await getValidAuthorId();

    const getValidGenreId = async () => {
      const genre = await prismaClient.genre.findFirst();
      return genre.id;
    };
    const validGenreId = await getValidGenreId();
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
        genres: {
          connect: {
            id: validGenreId,
            title: "Test Genre",
          },
        },
        authors: {
          connect: {
            id: validAuthorId,
            name: "Test Author",
          },
        },
      },
    });
  });
  afterEach(async () => {
    await prismaClient.book.deleteMany();
    await prismaClient.author.deleteMany();
    await prismaClient.genre.deleteMany();
    await prismaClient.user.deleteMany();
  });
  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should create a book", async () => {
    const getValidAuthorId = async () => {
      const author = await prismaClient.author.findFirst();
      return author.id;
    };
    const getValidGenreId = async () => {
      const genre = await prismaClient.genre.findFirst();
      return genre.id;
    };
    const validGenreId = await getValidGenreId();
    const validAuthorId = await getValidAuthorId();
    const newBook = {
      title: "Test Book 2",
      isbn: "08021247339",
      description: "This is a test book",
      publishDate: new Date("2021-01-01T00:00:00Z"),
      format: Format.HARDCOVER,
      language: "English",
      country: "United States",
      numOfPages: 100,
      pdfLink: "https://test.com",
      coverPicture: "https://test.com",
      authors: [validAuthorId],

      genres: [validGenreId],
    };
    const createdBook = await booksRepository.createBook(newBook);

    const book = await prismaClient.book.findFirst({
      where: {
        title: newBook.title,
      },
    });
    expect(createdBook).toEqual(book);
  });

  it("should get books by id", async () => {
    const bookId = 1;
    const books = await booksRepository.getBookById(bookId);

    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
      },
    });
    expect(books).toEqual(book);
  });

  it("should get books by Author Id", async () => {
    const getValidAuthorId = async () => {
      const author = await prismaClient.author.findFirst();
      return author.id;
    };
    const validAuthorId = await getValidAuthorId();
    const books = await booksRepository.getBooksByAuthorId(validAuthorId);

    const author = await prismaClient.author.findFirst({
      where: {
        id: validAuthorId,
      },
      include: {
        books: true,
      },
    });
    expect(books).toEqual(author.books);
  });

  it("should get books by Genre Id", async () => {
    const getValidGenreId = async () => {
      const genre = await prismaClient.genre.findFirst();
      return genre.id;
    };
    const validGenreId = await getValidGenreId();
    const books = await booksRepository.getBooksByGenreId(validGenreId);

    const genre = await prismaClient.genre.findFirst({
      where: {
        id: validGenreId,
      },
      include: {
        books: true,
      },
    });
    expect(books).toEqual(genre.books);
  });

  it("should get all books", async () => {
    const searchQueryDto = {};
    const books = await booksRepository.getAllBooks(searchQueryDto);
    const allBooks = await prismaClient.book.findMany();
    expect(books).toHaveLength(allBooks.length);
  });
  it("should delete a book", async () => {
    const getValidBookId = async () => {
      const book = await prismaClient.book.findFirst();
      return book.id;
    };
    const bookId = await getValidBookId();
    await booksRepository.deleteBookById(bookId);
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
      },
    });
    expect(book).toBeNull();
  });

  it("should get books by user id ", async () => {
    const getValidbooksId = async () => {
      const book = await prismaClient.book.findFirst();
      return book.id;
    };
    const getValidUserId = async () => {
      const user = await prismaClient.user.findFirst();
      return user.id;
    };
    const validUserId = await getValidUserId();
    const validBookId = await getValidbooksId();
    const books = await booksRepository.getBooksByUserId(validBookId);
    const user = await prismaClient.user.findFirst({
      where: {
        id: validUserId,
      },
      include: {
        books: true,
      },
    });
    expect(user.books).toHaveLength(books.length);
  });

  it("should update a book rating", async () => {
    const getValidBookId = async () => {
      const book = await prismaClient.book.findFirst();
      return book.id;
    };
    const bookId = await getValidBookId();
    const rating = 4;
    await booksRepository.updateBookRating(rating, bookId);
    const book = await prismaClient.book.findFirst({
      where: {
        id: bookId,
      },
    });
    expect(book.rating).toEqual(rating);
  });
});
