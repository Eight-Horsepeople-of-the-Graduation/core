import { Format } from "@prisma/client";
import genresRepository from "@modules/genres/genres.repository";
import prismaClient from "@common/utils/prisma";

describe("Genres Repository Integration Tests", () => {
  beforeAll(async () => {
    await prismaClient.genre.create({
      data: {
        title: "Test Genre",
        description: "This is a test genre",
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
  }, 20000);
  afterAll(async () => {
    await prismaClient.genre.deleteMany();
    await prismaClient.book.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;
    await prismaClient.$disconnect();
  }, 20000);

  it("should return all genres", async () => {
    const allGenres = await genresRepository.getAllGenres({ term: "" });
    const genres = await prismaClient.genre.findMany();

    expect(genres).toHaveLength(allGenres.length);
  }, 20000);

  it("should return genre by id", async () => {
    const genre = await prismaClient.genre.findFirst();
    const foundGenre = await genresRepository.getGenreById(genre.id);

    expect(foundGenre).toEqual(genre);
  }, 20000);
  it("should create a new genre", async () => {
    const newGenre = await genresRepository.createGenre({
      title: "New Genre",
      description: "This is a new genre",
    });
    const genre = await prismaClient.genre.findUnique({
      where: {
        title: newGenre.title,
      },
    });

    expect(newGenre).toHaveProperty("title");
  }, 20000);

  it("should return genres by book id", async () => {
    const genre = await prismaClient.genre.findFirst();
    const genres = await genresRepository.getGenresByBookId(genre.id);
    const book = await prismaClient.book.findFirst();
    const genresByBook = await prismaClient.genre.findMany({
      where: {
        books: {
          some: {
            id: book.id,
          },
        },
      },
    });
    expect(genres).toHaveLength(genresByBook.length);
  }, 20000);

  it("should update genre by id", async () => {
    const genre = await prismaClient.genre.findFirst();
    const updatedGenre = await genresRepository.updateGenreById(genre.id, {
      title: "Updated Genre",
      description: "",
    });

    expect(updatedGenre.title).toEqual("Updated Genre");
  }, 20000);

  it("should delete genre by id", async () => {
    const getValidGenreId = async () => {
      const genre = await prismaClient.genre.findFirst();
      return genre.id;
    };
    const genreId = await getValidGenreId();
    await genresRepository.deleteGenreById(genreId);
    const genre = await prismaClient.genre.findUnique({
      where: { id: genreId },
    });

    expect(genre).toBeNull();
  }, 20000);
});
