import {
  Body,
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
import {
  CreateBookshelfDto,
  SearchQueryDto,
  UpdateBookshelfDto,
} from "../dtos";

import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "../interfaces/bookshelves.interface";

@Route("bookshelves")
@Tags("Bookshelves")
export class BookshelvesDocs {
  @Get("/")
  public getAllBookshelves(
    @Queries() searchQueryDto: SearchQueryDto
  ): IBookshelfWithUser[] | any {}

  @Get("/:bookshelfId")
  public getBookshelfById(
    @Path() bookshelfId: number
  ): OptionalBookshelf | any {}

  @Post("/")
  public createBookshelf(@Body() data: CreateBookshelfDto): IBookshelf | any {}

  @Patch("/add-books/:bookshelfId")
  public addBookToBookshelf(
    @Path() bookshelfId: number,
    @Body() bookIds: { bookIds: number[] }
  ): IBookshelf | any {}

  @Patch("/remove-books/:bookshelfId")
  public removeBooksFromBookshelf(
    @Path() bookshelfId: number,
    @Body() bookIds: { bookIds: number[] }
  ): IBookshelf | any {}

  @Patch("/:bookshelfId")
  public updateBookshelf(
    @Path() bookshelfId: number,
    @Body() updateBookshelfDto: UpdateBookshelfDto
  ): IBookshelf | any {}

  @Delete("/:bookshelfId")
  public deleteBookshelf(
    @Path() bookshelfId: number
  ): IBookshelfWithoutBooks | any {}
}
