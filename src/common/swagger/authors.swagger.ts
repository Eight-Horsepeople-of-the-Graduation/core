import {
  Body,
  Get,
  Path,
  Post,
  Route,
  Queries,
  Delete,
  Tags,
  Patch,
} from "tsoa";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import {
  CreateAuthorDto,
  UpdateAuthorDto,
} from "@modules/authors/dtos/authors.dto";
import { IAuthor, OptionalAuthor } from "@common/interfaces/authors.interface";
import { IBookWithoutAuthorsAndGenres } from "@common/interfaces/books.interface";

@Route("authors")
@Tags("Authors")
export class AuthorsDocs {
  @Get("/")
  getAllAuthors(@Queries() searchQueryDto: SearchQueryDto): IAuthor[] | any {}

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
