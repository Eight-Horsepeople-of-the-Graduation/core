import usersRepository from "../repositories/users.repository";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import {
  IUser,
  OptionalUser,
  UserWithoutPassword,
} from "../interfaces/users.interface";

export const getAllUsers = async (
  filter: SearchQueryDto
): Promise<UserWithoutPassword[]> => {
  const users: IUser[] = await usersRepository.getAllUsers(filter);

  return users.map(({ password: undefined, ...user }) => user);
};

export const getUserById = async (id: number): Promise<OptionalUser> => {
  const user: OptionalUser = await usersRepository.getUserById(id);

  return user;
};

export const getUserByUsername = async (
  username: string
): Promise<OptionalUser> => {
  const user: OptionalUser = await usersRepository.getUserByUsername(username);

  return user;
};

export const createUser = async (
  userData: CreateUserDto
): Promise<UserWithoutPassword> => {
  const user: IUser = await usersRepository.createUser(userData);
  const { password, ...userWithoutPassword }: IUser = user;

  return userWithoutPassword;
};

export const updateUserById = async (
  id: number,
  updatedData: UpdateUserDto
): Promise<UserWithoutPassword> => {
  const user: IUser = await usersRepository.updateUserById(id, updatedData);

  const { password, ...userWithoutPassword }: IUser = user;

  return userWithoutPassword;
};

export const deleteUserById = async (
  id: number
): Promise<UserWithoutPassword> => {
  const user: IUser = await usersRepository.deleteUserById(id);
  const { password, ...userWithoutPassword }: IUser = user;

  return userWithoutPassword;
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById,
};
