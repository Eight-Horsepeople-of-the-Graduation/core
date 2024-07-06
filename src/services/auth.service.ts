import * as bcrypt from "bcrypt";
import usersService from "@services/users.service";
import { LogInDto, SignUpDto } from "../dtos/auth.dto";
import { HttpException } from "@exceptions/http.exception";
import { JwtPayload } from "../types/jwt-payload.interface";
import * as jwt from "jsonwebtoken";
import config from "../config";

export const signUp = async (signUpDto: SignUpDto) => {
  const user = await usersService.createUser(signUpDto);

  const tokens = await getTokens(user.id, user.email);
  await updateRefreshToken(user.id, tokens.refreshToken);

  return { user, tokens };
};

export const logIn = async (logInDto: LogInDto) => {
  const user = await usersService.validateCredentials(
    logInDto.email,
    logInDto.password
  );

  const tokens = await getTokens(user.id, user.email);
  await updateRefreshToken(user.id, tokens.refreshToken);

  return { user, tokens };
};

export const logOut = async (userId: number) => {
  await usersService.updateUserById(userId, { refreshToken: null });
};

export const refreshTokens = async (userId: number, refreshToken: string) => {
  const user = await usersService.getUserById(userId);
  if (!user.refreshToken) throw new HttpException("Unauthorized", 401);

  const refreshTokensMatch = await bcrypt.compare(
    refreshToken,
    user.refreshToken
  );
  if (!refreshTokensMatch) throw new HttpException("Unauthorized", 401);

  const tokens = await getTokens(user.id, user.email);
  await updateRefreshToken(user.id, tokens.refreshToken);

  return tokens;
};

export const getTokens = async (userId: number, email: string) => {
  const payload: JwtPayload = { sub: userId, email };

  const accessToken = jwt.sign(payload, config.accessToken.secret, {
    expiresIn: config.accessToken.expiresIn,
  });
  const refreshToken = jwt.sign(payload, config.refreshToken.secret, {
    expiresIn: config.refreshToken.expiresIn,
  });

  return { accessToken, refreshToken };
};

export const updateRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await usersService.updateUserById(userId, {
    refreshToken: hashedRefreshToken,
  });
};

export default {
  signUp,
  logIn,
  logOut,
  refreshTokens,
};
