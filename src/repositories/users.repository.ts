import { CreateUserDto, SearchQueryDto, UpdateUserDto } from "../dtos";
import prismaClient from "../utils/prisma";
import { IUser, OptionalUser } from "../interfaces/users.interface";

export const getAllUsers = async (
  searchQueryDto: SearchQueryDto
): Promise<IUser[]> => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip: number = (page - 1) * limit;

  const users: IUser[] = await prismaClient.user.findMany({
    where: {
      ...(term && {
        username: {
          contains: term,
          mode: "insensitive",
        },
      }),
    },
    skip,

    take: limit,
  });

  return users;
};

export const getUserById = async (id: number): Promise<OptionalUser> => {
  const user: OptionalUser = await prismaClient.user.findUnique({
    where: { id },
  });

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<OptionalUser> => {
  const user: OptionalUser = await prismaClient.user.findUnique({
    where: { username },
  });

  return user;
};

export const createUser = async (userData: CreateUserDto): Promise<IUser> => {
  const user: IUser = await prismaClient.user.create({
    data: userData,
  });

  return user;
};

export const updateUserById = async (
  id: number,
  updatedData: UpdateUserDto
): Promise<IUser> => {
  const user: IUser = await prismaClient.user.update({
    where: { id },
    data: updatedData,
  });

  return user;
};

export const deleteUserById = async (id: number): Promise<IUser> => {
  const user:IUser = await prismaClient.user.delete({
    where: { id },
  });

  return user;
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById,
};
