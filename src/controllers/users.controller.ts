import { Request, Response } from "express";
import usersService from "../services/users.service";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { plainToInstance } from "class-transformer";
import {
  IUser,
  OptionalUser,
  UserWithoutPassword,
} from "../interfaces/users.interface";
import { HttpStatus } from "../enums/http-status.enum";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword[]>> => {
  const filter: SearchQueryDto = plainToInstance(SearchQueryDto, req.query);

  const users: UserWithoutPassword[] = await usersService.getAllUsers(filter);

  return res.status(HttpStatus.OK).send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword>> => {
  const id: number = parseInt(req.params.id, 10);

  const user: OptionalUser = await usersService.getUserById(id);
  if (!user)
    return res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });

  const { password, ...userWithoutPassword }: IUser = user; // Destructure to remove password

  return res.status(HttpStatus.OK).send(userWithoutPassword);
};

export const getUserByUsername = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword>> => {
  const username: string = req.params.username;

  const user: OptionalUser = await usersService.getUserByUsername(
    username.toLowerCase()
  );
  if (!user)
    return res.status(HttpStatus.NOT_FOUND).send({ message: "User not found" });

  const { password, ...userWithoutPassword }: IUser = user; // Destructure to remove password

  return res.status(HttpStatus.OK).send(userWithoutPassword);
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword>> => {
  const userData: CreateUserDto = req.body;

  const user: UserWithoutPassword = await usersService.createUser(userData);

  return res.status(HttpStatus.CREATED).send(user);
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword>> => {
  const id: number = parseInt(req.params.id, 10);
  const updatedData: UpdateUserDto = req.body;

  const user: UserWithoutPassword = await usersService.updateUserById(
    id,
    updatedData
  );

  return res.status(HttpStatus.OK).send(user);
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response<UserWithoutPassword>> => {
  const id: number = parseInt(req.params.id, 10);

  const user: UserWithoutPassword = await usersService.deleteUserById(id);

  return res.status(HttpStatus.OK).send(user);
};

export default {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  updateUserById,
  deleteUserById,
};
