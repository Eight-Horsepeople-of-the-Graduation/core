import { IBookWithoutAuthorsAndGenres } from "../interfaces/books.interface";
import {
  IGenre,
  IGenreWithBooks,
  OptionalGenre,
} from "../interfaces/genres.interface";
import { CreateGenreDto } from "../../modules/genres/dtos/create-genre.dto";
import { UpdateGenreDto } from "../../modules/genres/dtos/update-genre.dto";
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

@Route("genres")
@Tags("Genres")
export class GenresDocs {
  @Get("/")
  getAllGenres(
    @Queries() searchQueryDto: SearchQueryDto
  ): IGenreWithBooks[] | any {}

  @Get("/:genreId")
  getGenreById(@Path() genreId: number): OptionalGenre | any {}

  @Get("/:genreId/books")
  getBooksByGenreId(
    @Path() genreId: number
  ): IBookWithoutAuthorsAndGenres[] | any {}

  @Post("/")
  createGenre(@Body() createGenreDto: CreateGenreDto): IGenre | any {}

  @Patch("/:genreId")
  updateGenreById(
    @Path() genreId: number,
    @Body() updateGenreDto: UpdateGenreDto
  ): IGenre | any {}

  @Delete("/:genreId")
  deleteGenreById(@Path() genreId: number): IGenre | any {}
}
