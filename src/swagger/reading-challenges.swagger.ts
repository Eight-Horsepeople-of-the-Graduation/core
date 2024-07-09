import {
  CreateReadingChallengeDto,
  Duration,
  UpdateReadingChallengeDto,
} from "../dtos/index";
import {
  IReadingChallenge,
  IReadingChallengeWithBooks,
} from "../interfaces/reading-challenges.interface";
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
import { IBookWithoutAuthorsAndGenres } from "../interfaces/books.interface";

@Route("/reading-challenges")
@Tags("Reading Challenges")
export class ReadingChallengesDocs {
  @Get("/")
  getAllReadingChallenges(): IReadingChallengeWithBooks[] | any {}

  @Get("/:readingChallengeId")
  getReadingChallengeById(
    @Path() readingChallengeId: number
  ): IReadingChallengeWithBooks | any {}

  @Get("/:readingChallengeId/books")
  getBooksByReadingChallengeId(
    @Path() readingChallengeId: number
  ): IBookWithoutAuthorsAndGenres[] | any {}

  @Post("/")
  createReadingChallenge(
    @Body() readingChallengeData: CreateReadingChallengeDto
  ): IReadingChallenge | any {}

  @Patch("/:readingChallengeId")
  updateReadingChallengeDetails(
    @Path() readingChallengeId: number,
    @Body() updatedData: UpdateReadingChallengeDto
  ): IReadingChallenge | any {}

  @Patch("/:userId/add-book/:bookId")
  addBookToUserReadingChallenges(
    @Path() userId: number,
    @Path() bookId: number
  ): IReadingChallengeWithBooks[] | any {}

  @Patch("/:userId/remove-book/:bookId")
  deleteBookFromUserReadingChallenges(
    @Path() userId: number,
    @Path() bookId: number
  ): IReadingChallengeWithBooks[] | any {}

  @Delete("/:readingChallengeId")
  deleteReadingChallenge(
    @Path() readingChallengeId: number
  ): IReadingChallenge | any {}
}
