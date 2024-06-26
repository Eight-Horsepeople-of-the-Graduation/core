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

import { IBookshelf } from "./interfaces";

@Route("bookshelves")
@Tags("Bookshelves")
export class BookshelvesDocs {
  @Get("/")
  public getAllBookshelves(
    @Queries() searchQueryDto: SearchQueryDto
  ): IBookshelf[] | any {}

  @Get("/:id")
  public getBookshelfById(@Path() id: number): IBookshelf | any {}

  @Get("/user/:id")
  public getBookshelvesByUserId(@Path() id: number): IBookshelf[] | any {}

  @Post("")
  public createBookshelf(@Body() data: CreateBookshelfDto): IBookshelf | any {}

  @Patch("/add-books/:id")
  public addBookToBookshelf(
    @Path() id: number,
    @Body() bookIds: number[]
  ): IBookshelf | any {}

  @Patch("/remove-books/:id")
  public removeBooksFromBookshelf(
    @Path() id: number,
    @Body() bookIds: number[]
  ): IBookshelf | any {}

  @Put("/:id")
  public updateBookshelf(
    @Path() id: number,
    @Body() updateBookshelfDto: UpdateBookshelfDto
  ): IBookshelf | any {}

  @Delete("/:id")
  public deleteBookshelf(@Path() id: number): IBookshelf | any {}
}
