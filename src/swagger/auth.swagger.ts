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
import * as bcrypt from "bcrypt";
import usersService from "@services/users.service";
import { LogInDto, SignUpDto } from "../dtos/auth.dto";
import { HttpException } from "@exceptions/http.exception";
import { JwtPayload } from "../types/jwt-payload.interface";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { IUserWithoutPassword } from "../interfaces/users.interface";
@Route("auth")
@Tags("Auth")
export class AuthDocs {
  @Post("/signup")
  signUp(@Body() signUpDto: SignUpDto):
    | {
        user: IUserWithoutPassword;
        tokens: { accessToken: string; refreshToken: string };
      }
    | any {}

  @Post("/login")
  logIn(@Body() logInDto: LogInDto):
    | {
        user: IUserWithoutPassword;
        tokens: { accessToken: string; refreshToken: string };
      }
    | any {}

  @Delete("/logout")
  logOut(): void {}

  @Post("/refresh-tokens")
  refreshTokens(
    @Body() refreshToken: { refreshToken: string }
  ): { accessToken: string; refreshToken: string } | any {}
}
