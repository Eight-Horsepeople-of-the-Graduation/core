import booksRepository from "@modules/books/books.repository";
import prismaClient from "@common/utils/prisma";
import { Format } from "@modules/books/dtos/books.dto";
describe("Books Repository Integration Tests", () => {
  beforeAll(async () => {
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
  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.author.deleteMany();
    await prismaClient.genre.deleteMany();
    await prismaClient.book.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;

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
  }, 20000);

  it("should get books by id", async () => {
    const bookId = 1;
    const books = await booksRepository.getBookById(bookId);

    const book = await prismaClient.book.findUnique({
      where: {
        id: bookId,
      },
      include: {
        authors: true,
        genres: true,
      },
    });
    expect(books).toEqual(book);
  }, 20000);

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
  }, 20000);

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
  }, 20000);

  it("should get all books", async () => {
    const searchQueryDto = {};
    const books = await booksRepository.getAllBooks(searchQueryDto);
    const allBooks = await prismaClient.book.findMany();
    expect(books).toHaveLength(allBooks.length);
  }, 20000);
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
  }, 20000);

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
  }, 20000);

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
  }, 20000);
});
