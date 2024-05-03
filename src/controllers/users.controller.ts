import { Request, Response } from "express";
import * as userService from "../services/users.service";
import logger from "../utils/logger";
import { CreateUserDto, UpdateUserDto } from "../dtos";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  logger.log("info", "Users fetched successfully", { users });
  return res.send(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const user = await userService.getUserById(id);

  return res.send(user);
};

export const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserDto = req.body;

  const user = await userService.createUser(userData);

  return res.status(201).send(user);
};

export const updateUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedData: UpdateUserDto = req.body;

  const user = await userService.updateUserById(id, updatedData);

  return res.send(user);
};

export const deleteUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  const user = await userService.deleteUserById(id);

  return res.send(user);
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
