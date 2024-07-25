import {
  IBookshelf,
  IBookshelfWithoutBooks,
  IBookshelfWithUser,
  OptionalBookshelf,
} from "../interfaces/bookshelves.interface";
import { CreateBookshelfDto } from "../../modules/bookshelves/dtos/create-bookshelf.dto";
import { SearchQueryDto } from "../../modules/search/dtos/search.dto";
import {
  Body,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Queries,
  Route,
  Tags,
} from "tsoa";
import { UpdateBookshelfDto } from "@modules/bookshelves/dtos/update-bookshelf.dto";

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
