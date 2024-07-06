import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { IUserWithoutPassword } from "../interfaces/users.interface";

export const getAllUsers = async (
  filter: SearchQueryDto
): Promise<IUserWithoutPassword[]> => {
  const users = await usersRepository.getAllUsers(filter);

  return users;
};

export const getUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.getUserById(userId);

  return user;
};

export const createUser = async (
  createUserDto: CreateUserDto
): Promise<IUserWithoutPassword> => {
  const newUser = await usersRepository.createUser(createUserDto);

  return newUser;
};

export const updateUserById = async (
  userId: number,
  updateUserDto: UpdateUserDto
): Promise<IUserWithoutPassword> => {
  const updatedUser = await usersRepository.updateUserById(
    userId,
    updateUserDto
  );

  return updatedUser;
};

export const deleteUserById = async (
  userId: number
): Promise<IUserWithoutPassword> => {
  const deletedUser = await usersRepository.deleteUserById(userId);

  return deletedUser;
};

export const validateCredentials = async (
  email: string,
  password: string
): Promise<IUserWithoutPassword> => {
  const user = await usersRepository.validateCredentials(email, password);

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  validateCredentials,
};
