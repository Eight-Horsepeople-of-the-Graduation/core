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
import { CreateBookDto, SearchQueryDto, UpdateBookDto } from "../dtos";
import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "../interfaces/books.interface";
import { IGenre } from "../interfaces/genres.interface";
import { IReviewWithUserAndBook } from "../interfaces/reviews.interface";

@Route("books")
@Tags("Books")
export class BooksDocs extends Controller {
  @Get("/")
  public getAllBooks(
    @Queries() searchQueryDto: SearchQueryDto
  ): IBook[] | any {}

  @Get("/:bookId")
  public getBookById(@Path() bookId: number): OptionalBook | any {}

  @Get("/:bookId/reviews")
  public getReviewsByBookId(
    @Path() bookId: number
  ): IReviewWithUserAndBook[] | any {}

  @Get("/:bookId/genres")
  public getGenressByBookId(@Path() bookId: number): IGenre[] | any {}

  @Get("/:bookId/authors")
  public getAuthorsByBookId(
    @Path() bookId: number
  ): IReviewWithUserAndBook[] | any {}

  @Post("/")
  public createBook(
    @Body() createBookDto: CreateBookDto
  ): IBookWithoutAuthorsAndGenres | any {}

  @Patch("/:bookId")
  public updateBookById(
    @Path() bookId: number,
    @Body() updateBookDto: UpdateBookDto
  ): IBookWithoutAuthorsAndGenres | any {}

  @Delete("/:bookId")
  public deleteBookById(
    @Path() bookId: number
  ): IBookWithoutAuthorsAndGenres | any {}
}
