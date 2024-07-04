import { Body, Get, Path, Post, Put, Route, Queries, Delete, Tags, Patch } from "tsoa";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { IUser, OptionalUser, UserWithoutPassword } from "../interfaces/users.interface";

@Route("users")
@Tags("Users")
export class UsersDocs {
  @Get("/")
  public getAllUsers(@Queries() filter: SearchQueryDto): UserWithoutPassword[] | any {}

  @Get("/id/:id")
  public getUserById(@Path() id: number): UserWithoutPassword | any {}

  @Get("/username/:username")
  public getUserByUsername(@Path() username: string): UserWithoutPassword | any {}

  @Post("/")
  public createUser(@Body() userData: CreateUserDto): UserWithoutPassword | any {}

  @Patch("/:id")
  public updateUserById(
    @Path() id: number,
    @Body() updatedData: UpdateUserDto
  ): UserWithoutPassword | any {}

  @Delete("/:id")
  public deleteUserById(@Path() id: number): UserWithoutPassword | any {}
}
