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
import { CreateGenreDto, SearchQueryDto, UpdateGenreDto } from "../dtos";
import {
  IGenre,
  IGenreWithBooks,
  OptionalGenre,
} from "../interfaces/genres.interface";

@Route("genres")
@Tags("Genres")
export class GenresDocs {
  @Get("/")
  getAllGenres(
    @Queries() searchQueryDto: SearchQueryDto
  ): IGenreWithBooks[] | any {}

  @Get("/:genreId")
  getGenreById(@Path() genreId: number): OptionalGenre | any {}

  @Post("/")
  createGenre(@Body() createGenreDto: CreateGenreDto): IGenre | any {}

  @Put("/:genreId")
  updateGenreById(
    @Path() genreId: number,
    @Body() updateGenreDto: UpdateGenreDto
  ): IGenre | any {}

  @Delete("/:genreId")
  deleteGenreById(@Path() genreId: number): IGenre | any {}
}
