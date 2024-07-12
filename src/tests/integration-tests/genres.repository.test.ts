import { Format } from "@prisma/client";
import genresRepository from "@modules/genres/genres.repository";
import prismaClient from "@common/utils/prisma";

describe("Genres Repository Integration Tests", () => {
  beforeEach(async () => {
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
  });
  afterEach(async () => {
    await prismaClient.genre.deleteMany();
    await prismaClient.book.deleteMany();
  });
  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should return all genres", async () => {
    const allGenres = await genresRepository.getAllGenres({ term: "" });
    const genres = await prismaClient.genre.findMany();

    expect(genres).toHaveLength(allGenres.length);
  });

  it("should return genre by id", async () => {
    const genre = await prismaClient.genre.findFirst();
    const foundGenre = await genresRepository.getGenreById(genre.id);

    expect(foundGenre).toEqual(genre);
  });
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
  });

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
  });

  it("should update genre by id", async () => {
    const genre = await prismaClient.genre.findFirst();
    const updatedGenre = await genresRepository.updateGenreById(genre.id, {
      title: "Updated Genre",
      description: "",
    });

    expect(updatedGenre.title).toEqual("Updated Genre");
  });

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
  });
});
