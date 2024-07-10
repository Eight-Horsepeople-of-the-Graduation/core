import { Format, Privacy } from "@dtos";
import bookshelvesRepository from "@repositories/bookshelves.repository";
import prismaClient from "@utils/prisma";

describe("Bookshelves Repository Integration Tests", () => {
  beforeEach(async () => {
    await prismaClient.user.create({
      data: {
        username: "testuseername1",
        email: "asmdajsk@gmail.com",
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
    const getValidUserId = async () => {
      const user = await prismaClient.user.findFirst();
      return user.id;
    };
    const validUserId = await getValidUserId();
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
    await prismaClient.bookshelf.create({
      data: {
        title: "Test Bookshelf",
        description: "This is a test bookshelf",
        userId: Number(validUserId),
      },
    });
  });

  afterEach(async () => {
    await prismaClient.book.deleteMany();
    await prismaClient.author.deleteMany();
    await prismaClient.genre.deleteMany();
    await prismaClient.user.deleteMany();
    await prismaClient.bookshelf.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should create a bookshelf", async () => {
    const getValidUserId = async () => {
      const user = await prismaClient.user.findFirst();
      return user.id;
    };
    const validUserId = await getValidUserId();

    const createdBookshelf = {
      title: "Test Bookshelf 1",
      description: "This is a test bookshelf",
      userId: Number(validUserId),
      privacy: Privacy.PUBLIC,
    };
    const newbookshelf =
      await bookshelvesRepository.createBookshelf(createdBookshelf);

    const bookshelf = await prismaClient.bookshelf.findFirst({
      where: {
        title: "Test Bookshelf 1",
      },
    });
    expect(newbookshelf).toMatchObject(bookshelf);
  });
  it("should add books to a bookshelf", async () => {
    const bookshelf = await prismaClient.bookshelf.findFirst();
    const bookshelfId = bookshelf.id;

    const book = await prismaClient.book.findFirst();
    const bookId = book.id;

    const updatedBookshelf = await bookshelvesRepository.addBooksToBookshelf(
      bookshelfId,
      [bookId]
    );

    const bookshelfWithBooks = await prismaClient.bookshelf.findFirst({
      where: {
        id: bookshelfId,
      },
      include: {
        books: true,
      },
    });

    expect(updatedBookshelf).toMatchObject(bookshelfWithBooks);
  });

  it("should get a bookshelf by id", async () => {
    const bookshelf = await prismaClient.bookshelf.findFirst();
    const bookshelfId = bookshelf.id;

    const foundBookshelf =
      await bookshelvesRepository.getBookshelfById(bookshelfId);

    expect(foundBookshelf).toMatchObject(bookshelf);
  });
  it("should get all bookshelves by user id", async () => {
    const getValidUserId = async () => {
      const user = await prismaClient.user.findFirst();
      return user.id;
    };
    const validUserId = await getValidUserId();

    const bookshelves =
      await bookshelvesRepository.getBookshelvesByUserId(validUserId);

    const bookselves = await prismaClient.bookshelf.findMany({
      where: {
        userId: validUserId,
      },
    });
    expect(bookshelves).toMatchObject(bookselves);
  });
  it("should get all bookshelves", async () => {
    const searchQueryDto = {};
    const bookshelves =
      await bookshelvesRepository.getAllBookshelves(searchQueryDto);
    const allBookshelves = await prismaClient.bookshelf.findMany();
    expect(bookshelves).toHaveLength(allBookshelves.length);
  });

  it("should update a bookshelf", async () => {
    const bookshelf = await prismaClient.bookshelf.findFirst();
    const bookshelfId = bookshelf.id;

    const updatedBookshelf = {
      title: "Updated Bookshelf",
      description: "This is an updated bookshelf",
      privacy: Privacy.PRIVATE,
    };

    const updatedbookshelf = await bookshelvesRepository.updateBookshelf(
      bookshelfId,
      updatedBookshelf
    );

    const bookshelfAfterUpdate = await prismaClient.bookshelf.findFirst({
      where: {
        id: bookshelfId,
      },
    });

    expect(updatedbookshelf).toMatchObject(bookshelfAfterUpdate);
  });

  it("should delete a bookshelf", async () => {
    const getValidBookshelfId = async () => {
      const bookshelf = await prismaClient.bookshelf.findFirst();
      return bookshelf.id;
    };
    const bookshelfId = await getValidBookshelfId();
    await bookshelvesRepository.deleteBookshelf(bookshelfId);
    const bookshelf = await prismaClient.bookshelf.findFirst({
      where: {
        id: bookshelfId,
      },
    });
    expect(bookshelf).toBeNull();
  });

  it("should remove books from a bookshelf", async () => {
    const bookshelf = await prismaClient.bookshelf.findFirst();
    const bookshelfId = bookshelf.id;

    const book = await prismaClient.book.findFirst();
    const bookId = book.id;

    await bookshelvesRepository.addBooksToBookshelf(bookshelfId, [bookId]);

    const updatedBookshelf =
      await bookshelvesRepository.removeBooksFromBookshelf(bookshelfId, [
        bookId,
      ]);

    const bookshelfWithBooks = await prismaClient.bookshelf.findFirst({
      where: {
        id: bookshelfId,
      },
      include: {
        books: true,
      },
    });

    expect(updatedBookshelf).toMatchObject(bookshelfWithBooks);
  });
  it("should get bookshelf by user id", async () => {
    const getValidUserId = async () => {
      const user = await prismaClient.user.findFirst();
      return user.id;
    };
    const validUserId = await getValidUserId();
    const bookshelf = await prismaClient.bookshelf.findFirst();
    const bookshelfId = bookshelf.id;

    const foundBookshelf = await bookshelvesRepository.getBookshelfByUserId(
      validUserId,
      bookshelfId
    );

    expect(foundBookshelf).toMatchObject(bookshelf);
  });
});
