import { Request, Response } from "express";
import { UpdateAuthorDto, getAuthorByIdDto } from "@dtos";
import authorsService from "@services/authors.service";

export const getAllAuthors = async (req: Request, res: Response) => {
  const authors = await authorsService.getAllAuthors(req.query);

  return res.send(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const data: getAuthorByIdDto = { id: +id };

  const author = await authorsService.getAuthorById(data.id);
  if (!author) return res.status(400).send("Author Not Found");

  return res.send(author);
};

export const createAuthor = async (req: Request, res: Response) => {
  const authorData = req.body;

  const author = await authorsService.createAuthor(authorData);

  return res.status(201).send(author);
};

export const updateAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateAuthorDto = req.body;

  const author = await authorsService.updateAuthorById(+id, data);

  return res.send(author);
};

export const deleteAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: getAuthorByIdDto = { id: +id };
  const author = await authorsService.deleteAuthorById(data.id);

  return res.send(author);
};

export default {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
