import {
  IBook,
  IBookWithoutAuthorsAndGenres,
  OptionalBook,
} from "@common/interfaces/books.interface";
import { IGenre } from "@common/interfaces/genres.interface";
import { IReviewWithUserAndBook } from "@common/interfaces/reviews.interface";
import { CreateBookDto, UpdateBookDto } from "@modules/books/dtos/books.dto";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Queries,
  Route,
  Tags,
} from "tsoa";

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
