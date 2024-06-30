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
import { IBook } from "./interfaces";
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
