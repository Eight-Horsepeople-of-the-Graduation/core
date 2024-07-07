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
} from "tsoa";
import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "../dtos";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "../interfaces/books.interface";
@Route("books")
@Tags("Books")
export class BooksDocs extends Controller {
  @Get("/")
  public getAllBooks(
    @Queries() searchQueryDto: SearchQueryDto
  ): IBook[] | any {}

  @Get(":id")
  public getBookById(@Path() id: number): OptionalBook | any {}

  @Post("/")
  public createBook(@Body() createBookDto: CreateBookDto): IBookWithoutAuthorsAndGenres | any {}

  @Put("/:id")
  public updateBookById(
    @Path() id: number,
    @Body() updateBookDto: UpdateBookDto
  ): IBookWithoutAuthorsAndGenres | any {}

  @Delete("/:id")
  public deleteBookById(@Path() id: number): IBookWithoutAuthorsAndGenres | any {}
}
