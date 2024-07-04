import { Body, Get, Path, Post, Put, Route, Queries, Delete, Tags, Patch } from "tsoa";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { IUser } from "../interfaces/users.interface";

@Route("users")
@Tags("Users")
export class UsersDocs {
  @Get("/")
  public getAllUsers(@Queries() filter: SearchQueryDto): IUser[] | any {}

  @Get("/id/:id")
  public getUserById(@Path() id: number): IUser | any {}

  @Get("/username/:username")
  public getUserByUsername(@Path() username: string): IUser | any {}

  @Post("/")
  public createUser(@Body() userData: CreateUserDto): IUser | any {}

  @Patch("/:id")
  public updateUserById(
    @Path() id: number,
    @Body() updatedData: UpdateUserDto
  ): IUser | any {}

  @Delete("/:id")
  public deleteUserById(@Path() id: number): IUser | any {}
}
