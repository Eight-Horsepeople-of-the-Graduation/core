import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";

export const getAllUsers = async (filter: SearchQueryDto) => {
  const users = await usersRepository.getAllUsers(filter);

  return users;
};

export const getUserById = async (id: number) => {
  const user = await usersRepository.getUserById(id);

  return user;
};

export const createUser = async (userData: CreateUserDto) => {
  const user = await usersRepository.createUser(userData);

  return user;
};

export const updateUserById = async (
  id: number,
  updatedData: UpdateUserDto
) => {
  const user = await usersRepository.updateUserById(id, updatedData);

  return user;
};

export const deleteUserById = async (id: number) => {
  const user = await usersRepository.deleteUserById(id);

  return user;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
