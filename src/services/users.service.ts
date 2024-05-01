import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";

export const getAllUsers = async () => {
  const users = await usersRepository.getAllUsers();

  return users;
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
