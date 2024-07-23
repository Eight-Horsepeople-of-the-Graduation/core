import { Format } from "@prisma/client";
import authorsRepository from "@modules/authors/authors.repository";
import prismaClient from "@common/utils/prisma";

describe("Author Repository Integration Tests", () => {
  beforeAll(async () => {
    await prismaClient.author.create({
      data: {
        name: "Test Author",
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
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.author.deleteMany();
    await prismaClient.book.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    await prismaClient.$disconnect();
  });

  it("should return all authors", async () => {
    const allauthers = await authorsRepository.getAllAuthors({ term: "" });
    const authors = await prismaClient.author.findMany();

    expect(authors).toHaveLength(allauthers.length);
  }, 20000);

  it("should return author by id", async () => {
    const author = await prismaClient.author.findFirst();
    const foundAuthor = await authorsRepository.getAuthorById(author.id);

    expect(foundAuthor).toEqual(author);
  }, 20000);

  it("should return authors by book id", async () => {
    const book = await prismaClient.book.findFirst();
    const authors = await authorsRepository.getAuthorsByBookId(book.id);

    expect(authors).toHaveLength(1);
  }, 20000);

  it("should create author", async () => {
    const newAuthor = await authorsRepository.createAuthor({
      name: "Test Author 2",
    });

    expect(newAuthor.name).toEqual("Test Author 2");
  }, 20000);

  it("should update author by id", async () => {
    const author = await prismaClient.author.findFirst();
    const updatedAuthor = await authorsRepository.updateAuthorById(author.id, {
      name: "Updated Author",
    });

    expect(updatedAuthor.name).toEqual("Updated Author");
  }, 20000);

  it("should delete author by id", async () => {
    const getValidAutorId = async () => {
      const author = await prismaClient.author.findFirst();
      return author.id;
    };
    const authorId = await getValidAutorId();
    await authorsRepository.deleteAuthorById(authorId);
    const authors = await prismaClient.author.findUnique({
      where: { id: authorId },
    });

    expect(authors).toBeNull();
  }, 20000);
});
