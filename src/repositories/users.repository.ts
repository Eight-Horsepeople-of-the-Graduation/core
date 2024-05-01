import { CreateUserDto, UpdateUserDto } from "../dtos";
import prismaClient from "../utils/prisma";

export const getAllUsers = async () => {
  const users = await prismaClient.user.findMany();

  return users;
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
  createUser,
  updateUserById,
  deleteUserById,
};
