import { Body, Get, Path, Post, Put, Route, Delete, Tags, Patch } from "tsoa";
import { CreateReadingChallengeDto, UpdateReadingChallengeDto } from "../dtos";
import { IReadingChallenge } from "../interfaces/reading-challenges.interface";

@Route("reading-challenges")
@Tags("Reading Challenges")
export class ReadingChallengesDocs {
  @Get("/")
  public getAllReadingChallenges(): IReadingChallenge[] | any {}

  @Get("/:readingChallengeId")
  public getReadingChallengeById(
    @Path() readingChallengeId: number
  ): IReadingChallenge | any {}

  @Get("/:readingChallengeId/books")
  getBooksByReadingChallengeId(
    @Path() readingChallengeId: number
  ): IReadingChallenge | any {}

  @Post("/")
  public createReadingChallenge(
    @Body() readingChallengeData: CreateReadingChallengeDto
  ): IReadingChallenge | any {}

  @Patch("/:readingChallengeId")
  public updateReadingChallenge(
    @Path() readingChallengeId: number,
    @Body() updatedData: UpdateReadingChallengeDto
  ): IReadingChallenge | any {}

  @Patch("/:readingChallengeId/add-book/:bookId")
  public addBookToReadingChallenge(
    @Path() readingChallengeId: number,
    @Body() bookId: number
  ): IReadingChallenge | any {}

  @Patch("/remove-book/:readingChallengeId")
  public deleteBookFromReadingChallenge(
    @Path() readingChallengeId: number,
    @Body() bookId: number
  ): IReadingChallenge | any {}

  @Delete("/:readingChallengeId")
  public deleteReadingChallenge(
    @Path() readingChallengeId: number
  ): IReadingChallenge | any {}
}
