import {
  Body,
  Get,
  Path,
  Post,
  Put,
  Route,
  Delete,
  Tags,
} from "tsoa";
import {
  CreateReadingChallengeDto,
  UpdateReadingChallengeDto,
} from "../dtos/index";
import { IReadingChallenge } from "./interfaces";

@Route("reading-challenges")
@Tags("Reading Challenges")
export class ReadingChallengesDocs {
  @Get("")
  public getAllReadingChallenges() : IReadingChallenge[] | any{}

  @Get("/:id")
  public getReadingChallengeById(@Path() id: number) : IReadingChallenge | any{}

  @Get("/user/:userId")
  public getReadingChallengesByUserId(@Path() userId: number) : IReadingChallenge[] | any {}

  @Put("/add-book/:readingChallengeId")
  public addBookToReadingChallenge(
    @Path() readingChallengeId: number,
    @Body() bookId: number
  ) : IReadingChallenge | any {}

  @Post("/")
  public createReadingChallenge(
    @Body() readingChallengeData: CreateReadingChallengeDto
  ) : IReadingChallenge | any {}

  @Put("/:id")
  public updateReadingChallenge(
    @Path() id: number,
   @Body() updatedData: UpdateReadingChallengeDto
  ) : IReadingChallenge | any {}
  
  @Delete("/:id")
  public deleteReadingChallenge(@Path() id: number) : IReadingChallenge | any {}
}
