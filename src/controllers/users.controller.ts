import { Request, Response } from "express";
import * as userService from "../services/users.service";
import logger from "../utils/logger";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  logger.log("info", "Users fetched successfully", { users });
  return res.send(users);
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const user = await userService.createUser(userData);

  return res.status(201).send(user);
};

export default {
  getAllUsers,
  createUser,
};
