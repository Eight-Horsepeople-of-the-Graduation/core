import { SelectUserWithoutPassword } from "@common/interfaces/users.interface";
import prismaClient from "@common/utils/prisma";
import { Gender } from "@modules/users/dtos/users.dto";
import usersRepository from "@modules/users/users.repository";

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

    await prismaClient.$queryRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
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
});
