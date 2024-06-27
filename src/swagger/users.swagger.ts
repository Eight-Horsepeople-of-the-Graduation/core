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
} from "tsoa";
import { CreateUserDto, UpdateUserDto } from "../dtos";
import { SearchQueryDto } from "../dtos/search.dto";
import { IUser } from "./interfaces";

@Route("users")
@Tags("Users")
export class UsersDocs {
  @Get("/")
  public getAllUsers(@Queries() filter: SearchQueryDto): IUser[] | any {}

  @Get("/:id")
  public getUserById(@Path() id: number): IUser | any {}

  @Post("/")
  public createUser(@Body() userData: CreateUserDto): IUser | any {}

  @Put("/:id")
  public updateUserById(
    @Path() id: number,
    @Body() updatedData: UpdateUserDto
  ): IUser | any {}

  @Delete("/:id")
  public deleteUserById(@Path() id: number): IUser | any {}
}
