import { Request, Response } from "express";
import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";
import authorsService from "../services/authors.service";
import { plainToInstance } from "class-transformer";
import { IAuthor, OptionalAuthor } from "../interfaces/authors.interface";

export const getAllAuthors = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor[]>> => {
  const filter = plainToInstance(SearchQueryDto, req.query);

  const authors = await authorsService.getAllAuthors(filter);

  return res.send(authors);
};

export const getAuthorById = async (
  req: Request,
  res: Response
): Promise<Response<OptionalAuthor>> => {
  const authorId = parseInt(req.params.authorId, 10);

  const author = await authorsService.getAuthorById(authorId);

  return res.send(author);
};

export const createAuthor = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor>> => {
  const createAuthorDto = plainToInstance(CreateAuthorDto, req.body);

  const newAuthor = await authorsService.createAuthor(createAuthorDto);

  return res.status(201).send(newAuthor);
};

export const updateAuthorById = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor>> => {
  const authorId = parseInt(req.params.authorId, 10);
  const updateAuthorDto = plainToInstance(UpdateAuthorDto, req.body);

  const updatedAuthor = await authorsService.updateAuthorById(
    authorId,
    updateAuthorDto
  );

  return res.send(updatedAuthor);
};

export const deleteAuthorById = async (
  req: Request,
  res: Response
): Promise<Response<IAuthor>> => {
  const authorId = parseInt(req.params.authorId, 10);

  const deletedAuthor = await authorsService.deleteAuthorById(authorId);

  return res.send(deletedAuthor);
};

export default {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById,
};
