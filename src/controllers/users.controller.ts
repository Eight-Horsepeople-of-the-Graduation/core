import { Request, Response } from "express";
import * as userService from "../services/users.service";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    return res.send(users);
  } catch (error) {
    console.error("Error listing users:", error);

    return res.status(500).send("Internal Server Error");
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);

    return res.status(201).send(user);
  } catch (error) {
    console.error("Error creating user:", error);

    return res.status(500).send("Internal Server Error");
  }
};
