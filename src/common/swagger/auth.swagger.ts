import { Body, Post, Route, Delete, Tags } from "tsoa";
import { IUserWithoutPassword } from "../interfaces/users.interface";
import { LogInDto, SignUpDto } from "@modules/auth/dtos/auth.dto";

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
