import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Route,
  Queries,
  Delete,
  Tags,
  Patch,
} from "tsoa";
import { CreateAuthorDto, SearchQueryDto, UpdateAuthorDto } from "../dtos";
import { IAuthor, OptionalAuthor } from "../interfaces/authors.interface";
import { IBookWithoutAuthorsAndGenres } from "../interfaces/books.interface";

@Route("authors")
@Tags("Authors")
export class AuthorsDocs {
  @Get("/")
  getAllAuthors(@Queries() SearchQueryDto: SearchQueryDto): IAuthor[] | any {}

  @Get("/:authorId")
  getAuthorById(@Path() authorId: number): OptionalAuthor | any {}

  @Post("/")
  createAuthor(@Body() createAuthorDto: CreateAuthorDto): IAuthor | any {}

  @Get("/:authorId/books")
  getBooksByAuthorId(
    @Path() authorId: number
  ): Promise<IBookWithoutAuthorsAndGenres[]> | any {}

  @Patch("/:authorId")
  updateAuthorById(
    @Path() authorId: number,
    @Body() updateAuthorDto: UpdateAuthorDto
  ): IAuthor | any {}

  @Delete("/:authorId")
  deleteAuthorById(@Path() authorId: number): IAuthor | any {}
}
