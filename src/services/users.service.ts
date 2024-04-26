import prisma from "../utils/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (userData: {
  username: string;
  email: string;
  password: string;
  country: string;
  gender: "MALE" | "FEMALE";
}) => {
  const { username, email, password, country, gender } = userData;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      country,
      gender,
    },
  });

  return user;
};