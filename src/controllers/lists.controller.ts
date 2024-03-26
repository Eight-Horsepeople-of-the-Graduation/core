import { Request, Response } from "express";
import * as listsService from "../services/lists.service";

export const listAllLists = async (req: Request, res: Response) => {
  const lists = await listsService.getAllLists();

  return res.send(lists);
};

export const createList = async (req: Request, res: Response) => {
  const listData = req.body;
  const list = await listsService.createList(listData);

  return res.status(201).send(list);
};
