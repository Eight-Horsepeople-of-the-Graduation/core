import { Request, Response } from "express";
import usersService from "../services/users.service";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { plainToInstance } from "class-transformer";
import { IUserWithoutPassword } from "../interfaces/users.interface";

export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const users = await usersService.getAllUsers(filter);

  return res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await usersService.getUserById(userId);

  return res.send(user);
};

export const updateUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);
  const updatedData: UpdateUserDto = req.body;

  const user = await usersService.updateUserById(userId, updatedData);

  return res.send(user);
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const userId = parseInt(req.params.userId, 10);

  const user = await usersService.deleteUserById(userId);

  return res.send(user);
};

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
