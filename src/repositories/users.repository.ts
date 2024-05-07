import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import prismaClient from "../utils/prisma";

export const getAllUsers = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const users = await prismaClient.user.findMany({
    where: {
      ...(term && { username: { contains: term } }),
    },
    skip,
    take: limit,
  });

  return users;
};

export const getUserById = async (id: number) => {
  const user = await prismaClient.user.findUnique({
    where: { id },
  });

  return user;
};

export const createUser = async (userData: CreateUserDto) => {
  const user = await prismaClient.user.create({
    data: userData,
  });

  return user;
};

export const updateUserById = async (
  id: number,
  updatedData: UpdateUserDto
) => {
  const user = await prismaClient.user.update({
    where: { id },
    data: updatedData,
  });

  return user;
};

export const deleteUserById = async (id: number) => {
  const user = await prismaClient.user.delete({
    where: { id },
  });

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
