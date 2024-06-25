import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Query,
  Route,
  SuccessResponse,
  Queries,
  Delete,
  Tags,
} from "tsoa";
import { CreateBookDto, Format, SearchQueryDto, UpdateBookDto } from "../dtos";
export interface IBook {
  id: number;
  title: string;
  isbn: string;
  description: string;
  publishDate: Date;
  format: Format;
  language: string;
  country: string;
  numOfPages: number;
  pdfLink: string | null;
}
@Route("books")
@Tags("Books")
export class BooksDocs extends Controller {
  @Get("/")
  public getAllBooks(
    @Queries() searchQueryDto: SearchQueryDto
  ): IBook[] | any {}

  @Get(":id")
  public getBookById(@Path() id: number): IBook | any {}

  @Post("/")
  public createBook(@Body() createBookDto: CreateBookDto): IBook | any {}

  @Put("/:id")
  public updateBookById(
    @Path() id: number,
    @Body() updateBookDto: UpdateBookDto
  ): IBook | any {}

  @Delete("/:id")
  public deleteBookById(@Path() id: number): IBook | any {}
}
