import { Request, Response } from "express";
import usersService from "../services/users.service";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { plainToInstance } from "class-transformer";

export const getAllUsers = async (req: Request, res: Response) => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const users = await usersService.getAllUsers(filter);

  return res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const user = await usersService.getUserById(id);

  return res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserDto = req.body;

  const user = await usersService.createUser(userData);

  return res.status(201).send(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedData: UpdateUserDto = req.body;

  const user = await usersService.updateUserById(id, updatedData);

  return res.send(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const user = await usersService.deleteUserById(id);

  return res.send(user);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
