import { SelectUserWithoutPassword } from "@common/interfaces/users.interface";
import { getDefaultTitles } from "@common/utils/build-default-bookshelves";
import prismaClient from "@common/utils/prisma";
import { Gender } from "@modules/users/dtos/users.dto";
import usersRepository from "@modules/users/users.repository";
import { signUp } from "@modules/auth/auth.service";
import { addBookToBookshelf } from "@modules/bookshelves/bookshelves.service";
import { Format } from "@modules/books/dtos/books.dto";
describe("User Repository Integration tests", () => {
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
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.bookshelf.deleteMany();
    await prismaClient.book.deleteMany();
    await prismaClient.author.deleteMany();
    await prismaClient.genre.deleteMany();

    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Bookshelf_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Book_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Author_id_seq" RESTART WITH 1`;
    await prismaClient.$queryRaw`ALTER SEQUENCE "Genre_id_seq" RESTART WITH 1`;

    await prismaClient.$disconnect();
  });

  it("should return all users", async () => {
    const allUsers = await usersRepository.getAllUsers({ term: "" });
    const users = await prismaClient.user.findMany();

    expect(users).toHaveLength(allUsers.length);
  });

  it("should return a user by id", async () => {
    const user = await prismaClient.user.findFirst();
    const validUserId = user.id;
    const foundUser = await usersRepository.getUserById(validUserId);

    const userWithId = await prismaClient.user.findUnique({
      where: {
        id: validUserId,
      },
      select: SelectUserWithoutPassword,
    });

    expect(foundUser).toMatchObject(userWithId);
  });

  it("should get user by username", async () => {
    const user = await prismaClient.user.findFirst();
    const validUsername = user.username;
    const foundUser = await usersRepository.getUserByUsername(validUsername);

    const userWithUsername = await prismaClient.user.findUnique({
      where: {
        username: validUsername,
      },
      select: SelectUserWithoutPassword,
    });

    expect(foundUser).toMatchObject(userWithUsername);
  });

  it("create a new user", async () => {
    const newUser = {
      username: "newuser",
      email: "asmdsdask@gmail.com",
      name: "asdasdasdasd",
      password: "asdasdasdasd",
      country: "adasasddasdas",
      gender: Gender.MALE,
      isAdmin: false,
    };
    const createdUser = await usersRepository.createUser(newUser);

    const user = await prismaClient.user.findUnique({
      where: {
        username: newUser.username,
      },
      select: SelectUserWithoutPassword,
    });

    expect(createdUser).toMatchObject(user);
  });
  it("should update user by id", async () => {
    const user = await prismaClient.user.findFirst();
    const validUserId = user.id;
    const updatedUser = await usersRepository.updateUserById(validUserId, {
      name: "updatedusername",
    });

    const userWithId = await prismaClient.user.findUnique({
      where: {
        id: validUserId,
      },
      select: SelectUserWithoutPassword,
    });

    expect(updatedUser).toMatchObject(userWithId);
  });
  it("should delete user by id", async () => {
    const user = await prismaClient.user.findFirst();
    const validUserId = user.id;
    const deletedUser = await usersRepository.deleteUserById(validUserId);

    const userWithId = await prismaClient.user.findUnique({
      where: {
        id: validUserId,
      },
      select: SelectUserWithoutPassword,
    });

    expect(userWithId).toBeNull();
  });

  it("should hash a password", async () => {
    const password = "password";
    const hashedPassword = await usersRepository.hashPassword(password);

    const userWithHashedPassword = await prismaClient.user.findFirst({
      where: {
        password: hashedPassword,
      },
    });
    expect(userWithHashedPassword).not.toBeNull;
  });

  it("should make sure the default bookshelves are created for a new user", async () => {
    const user = await signUp({
      username: "newuser",
      email: "test@test.com",
      name: "Ahmad Tamer Test",
      password: "password",
      country: "Egypt",
      gender: Gender.MALE,
      isAdmin: false,
    });
    const validUserId = user.user.id;
    const bookshelves = await prismaClient.bookshelf.findMany({
      where: {
        userId: validUserId,
      },
    });

    const bookshelvesTitles = bookshelves.map((bookshelf) =>
      bookshelf.title?.toLowerCase()
    );
    expect(bookshelvesTitles).toEqual(getDefaultTitles());
  });

  it("should make sure the 3 default bookshelves are mutually exclusive", async () => {
    const user = await signUp({
      username: "newuser_2",
      email: "test_2@test.com",
      name: "Ahmad Tamer Test",
      password: "password",
      country: "Egypt",
      gender: Gender.MALE,
      isAdmin: false,
    });
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
      authors: { create: [{ name: "Test Author" }] },
      genres: {
        create: [{ title: "Test Genre", description: "Test description" }],
      },
    };
    const book = await prismaClient.book.create({
      data: newBook,
    });

    console.log(book);
    const validUserId = user.user.id;
    const bookshelves = await prismaClient.bookshelf.findMany({
      where: {
        userId: validUserId,
      },
      include: {
        _count: {
          select: {
            books: true,
          },
        },
      },
    });

    const bookshelvesTitles = bookshelves.map((bookshelf) => {
      return { title: bookshelf.title?.toLowerCase(), id: bookshelf.id };
    });

    await addBookToBookshelf(bookshelvesTitles[0].id, [book.id]);
    //Make sure the sum of all the default booksholeves is 1
    expect(
      (
        await prismaClient.bookshelf.findMany({
          where: { userId: validUserId },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      ).reduce((acc, bookshelf) => acc + bookshelf._count.books, 0)
    ).toBe(1);

    //Make sure the target defalt bookshelf has this 1 book
    expect(
      (
        await prismaClient.bookshelf.findUniqueOrThrow({
          where: { id: bookshelvesTitles[0].id },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      )._count.books
    ).toBe(1);

    await addBookToBookshelf(bookshelvesTitles[1].id, [book.id]);
    //Make sure the sum of all the default booksholeves is 1
    expect(
      (
        await prismaClient.bookshelf.findMany({
          where: { userId: validUserId },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      ).reduce((acc, bookshelf) => acc + bookshelf._count.books, 0)
    ).toBe(1);

    //Make sure the target default bookshelf has this 1 book
    expect(
      (
        await prismaClient.bookshelf.findUniqueOrThrow({
          where: { id: bookshelvesTitles[1].id },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      )._count.books
    ).toBe(1);

    await addBookToBookshelf(bookshelvesTitles[2].id, [book.id]);
    expect(
      (
        await prismaClient.bookshelf.findMany({
          where: { userId: validUserId },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      ).reduce((acc, bookshelf) => acc + bookshelf._count.books, 0)
    ).toBe(1);

    //Make sure the target default bookshelf has this 1 book
    expect(
      (
        await prismaClient.bookshelf.findUniqueOrThrow({
          where: { id: bookshelvesTitles[2].id },
          include: {
            _count: {
              select: {
                books: true,
              },
            },
          },
        })
      )._count.books
    ).toBe(1);
  });
});
