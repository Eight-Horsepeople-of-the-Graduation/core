import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";

export const getAllUsers = async (filter: SearchQueryDto) => {
  const users = await usersRepository.getAllUsers(filter);

  return users;
};

export const getUserById = async (userId: number) => {
  const user = await usersRepository.getUserById(userId);

  return user;
};

export const createUser = async (createUserDto: CreateUserDto) => {
  const newUser = await usersRepository.createUser(createUserDto);

  return newUser;
};

export const updateUserById = async (
  userId: number,
  updateUserDto: UpdateUserDto
) => {
  const updatedUser = await usersRepository.updateUserById(
    userId,
    updateUserDto
  );

  return updatedUser;
};

export const deleteUserById = async (userId: number) => {
  const deletedUser = await usersRepository.deleteUserById(userId);

  return deletedUser;
};

export const validateCredentials = async (email: string, password: string) => {
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
