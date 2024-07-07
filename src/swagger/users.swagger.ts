import { Body, Get, Path, Post, Put, Route, Queries, Delete, Tags, Patch } from "tsoa";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { IUser, OptionalUser, IUserWithoutPassword } from "../interfaces/users.interface";

@Route("users")
@Tags("Users")
export class UsersDocs {
  @Get("/")
  public getAllUsers(@Queries() filter: SearchQueryDto): IUserWithoutPassword[] | any {}

  @Get("/id/:id")
  public getUserById(@Path() id: number): IUserWithoutPassword | any {}

  @Get("/username/:username")
  public getUserByUsername(@Path() username: string): IUserWithoutPassword | any {}

  @Post("/")
  public createUser(@Body() userData: CreateUserDto): IUserWithoutPassword | any {}

  @Patch("/:id")
  public updateUserById(
    @Path() id: number,
    @Body() updatedData: UpdateUserDto
  ): IUserWithoutPassword | any {}

  @Delete("/:id")
  public deleteUserById(@Path() id: number): IUserWithoutPassword | any {}
}
