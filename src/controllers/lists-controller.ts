import { Request, Response } from "express";
import * as listsService from "../services/lists.service";

export const listAllLists = async (req: Request, res: Response) => {
  try {
    const lists = await listsService.getAllLists();

    return res.send(lists);
  } catch (error) {
    console.error("Error listing all lists:", error);

    return res.status(500).send("Internal Server Error");
  }
};

export const createList = async (req: Request, res: Response) => {
  try {
    const listData = req.body;
    const list = await listsService.createList(listData);

    return res.status(201).send(list);
  } catch (error) {
    console.error("Error creating list:", error);

    return res.status(500).send("Internal Server Error");
  }
};
