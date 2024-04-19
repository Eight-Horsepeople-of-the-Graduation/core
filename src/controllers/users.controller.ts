import { Request, Response } from "express";
import * as userService from "../services/users.service";

export const listUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  return res.send(users);
};

export const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const user = await userService.createUser(userData);

  return res.status(201).send(user);
};
