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
import {  UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import {
  IUser,
  OptionalUser,
  IUserWithoutPassword,
} from "../interfaces/users.interface";
import { IReadingChallenge, IReadingChallengeWithBooks } from "../interfaces/reading-challenges.interface";
import { IReviewWithUserAndBook } from "../interfaces/reviews.interface";
import { IBookshelf } from "../interfaces/bookshelves.interface";
import { IBook } from "../interfaces/books.interface";

@Route("users")
@Tags("Users")
export class UsersDocs {
  @Get("/")
  public getAllUsers(
    @Queries() filter: SearchQueryDto
  ): IUserWithoutPassword[] | any {}

  @Get("/id/:userId")
  public getUserById(@Path() userId: number): IUserWithoutPassword | any {}

  @Get("/username/:username")
  public getUserByUsername(
    @Path() username: string
  ): IUserWithoutPassword | any {}

  @Get("/:userId/readingChallenges")
  public getReadingChallengesByUserId(
    @Path() userId: number,
  ): IReadingChallengeWithBooks[] | any {}

  @Get("/:userId/reviews")
  public getReviewsByUserId(
    @Path() userId: number
  ): IReviewWithUserAndBook[] | any {}

  @Get("/:userId/reviews/:reviewId")
  public getReviewByUserId(
    @Path() userId: number,
    @Path() reviewId: number
  ): IReviewWithUserAndBook | any {}

  @Get("/:userId/bookshelves")
  getBookshelvesByUserId(@Path() userId: number): IBookshelf[] | any {}

  @Get("/:userId/bookshelves/:bookshelfId")
  getBookshelfByUserId(
    @Path() userId: number,
    @Path() bookshelfId: number
  ): IBookshelf[] | any {}


  @Get("/:userId/books")
  getBooksByUserId(@Path() userId: number): IBook[] | any {}


  @Patch("/:id")
  public updateUserById(
    @Path() id: number,
    @Body() updatedData: UpdateUserDto
  ): IUserWithoutPassword | any {}

  @Delete("/:id")
  public deleteUserById(@Path() id: number): IUserWithoutPassword | any {}
}
