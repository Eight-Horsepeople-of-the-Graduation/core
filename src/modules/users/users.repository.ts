import * as bcrypt from "bcrypt";
import { HttpException } from "../../common/exceptions/http.exception";
import {
  IUser,
  IUserWithoutPassword,
  SelectUserWithoutPassword,
} from "../../common/interfaces/users.interface";
import prismaClient from "../../common/utils/prisma";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import { Transaction } from "@common/types/prismaClient-transaction.type";
import { UpdateUserDto } from "@modules/users/dtos/update-user.dto";
import { CreateUserDto } from "@modules/users/dtos/create-user.dto";

export const getAllUsers = async (
  searchQueryDto: SearchQueryDto
): Promise<IUserWithoutPassword[]> => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const users: IUserWithoutPassword[] = await prismaClient.user.findMany({
    where: {
      ...(term && {
        username: {
          contains: term,
          mode: "insensitive",
        },
      }),
    },
    skip,
    select: SelectUserWithoutPassword,
    take: limit,
  });

  return users;
};

export const getUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const user: IUserWithoutPassword = await prismaClient.user.findUnique({
    where: { id: userId },
    select: SelectUserWithoutPassword,
  });

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<IUserWithoutPassword> => {
  const user: IUserWithoutPassword = await prismaClient.user.findUnique({
    where: { username },
    select: SelectUserWithoutPassword,
  });

  return user;
};

export const createUser = async (
  createUserDto: CreateUserDto,
  tx?: Transaction
): Promise<IUserWithoutPassword> => {
  const _prismaClient = tx || prismaClient;
  const hashedPassword = await hashPassword(createUserDto.password);

  const newUser: IUserWithoutPassword = await _prismaClient.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword,
    },
    select: SelectUserWithoutPassword,
  });

  return newUser;
};

export const updateUserById = async (
  userId: number,
  updatedData: UpdateUserDto,
  tx?: Transaction
): Promise<IUserWithoutPassword> => {
  const _prismaClient = tx || prismaClient;
  const user = await _prismaClient.user.update({
    where: { id: userId },
    data: updatedData,
    select: SelectUserWithoutPassword,
  });

  return user;
};

export const deleteUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const deletedUser: IUserWithoutPassword = await prismaClient.user.delete({
    where: { id: userId },
    select: SelectUserWithoutPassword,
  });

  return deletedUser;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

export const validateCredentials = async (
  email: string,
  password: string
): Promise<IUserWithoutPassword> => {
  const user: IUser = await prismaClient.user.findUnique({
    where: { email },
  });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new HttpException("Invalid credentials", 401);

  user.password = undefined;

  return user;
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById,
  hashPassword,
  validateCredentials,
};
