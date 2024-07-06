import * as bcrypt from "bcrypt";
import { CreateUserDto, SearchQueryDto, UpdateUserDto } from "@dtos";
import prismaClient from "@utils/prisma";
import { HttpException } from "@exceptions/http.exception";

export const getAllUsers = async (searchQueryDto: SearchQueryDto) => {
  const { term, page = 1, limit = 10 } = searchQueryDto;
  const skip = (page - 1) * limit;

  const users = await prismaClient.user.findMany({
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

export const getUserById = async (userId: number) => {
  let user;

  try {
    user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        country: true,
        gender: true,
        refreshToken: true,
        profilePicture: true,
        isAdmin: true,
        birthDate: true,
        joinDate: true,
        updatedAt: true,
      },
    });
  } catch (error: any) {
    if (error.code === "P2025") throw new HttpException("User not found", 404);
    else throw new HttpException(error.message, 500);
  }

  return user;
};

export const createUser = async (createUserDto: CreateUserDto) => {
  const hashedPassword = await hashPassword(createUserDto.password);

  const newUser = await prismaClient.user.create({
    data: {
      ...createUserDto,
      password: hashedPassword,
    },
  });

  return newUser;
};

export const updateUserById = async (
  userId: number,
  updateUserDto: UpdateUserDto
) => {
  const updatedUser = await prismaClient.user.update({
    where: { id: userId },
    data: updateUserDto,
  });

  return updatedUser;
};

export const deleteUserById = async (userId: number) => {
  const deletedUser = await prismaClient.user.delete({
    where: { id: userId },
  });

  return deletedUser;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

export const validateCredentials = async (email: string, password: string) => {
  let user: any;

  try {
    user = await prismaClient.user.findUnique({
      where: { email },
    });
  } catch (error: any) {
    if (error.code === "P2025")
      throw new HttpException("Invalid credentials", 401);
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new HttpException("Invalid credentials", 403);

  user.password = undefined;

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  hashPassword,
  validateCredentials,
};
