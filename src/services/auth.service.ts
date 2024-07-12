import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import config from "../config";
import { LogInDto, SignUpDto } from "../dtos/auth.dto";
import { IUserWithoutPassword } from "../interfaces/users.interface";
import usersService from "./users.service";
import { HttpException } from "../exceptions/http.exception";
import { JwtPayload } from "../types/jwt-payload.interface";
import prismaClient from "../utils/prisma";
import usersRepository from "../repositories/users.repository";
import bookshelvesRepository from "../repositories/bookshelves.repository";
import { CreateBookshelfDto, Privacy } from "../dtos";
import { buildDefaultBookshelves } from "../utils/build-default-bookshelves";
import { Transaction } from "../types/prismaClient-transaction.type";

export const signUp = async (
  signUpDto: SignUpDto
): Promise<{
  user: IUserWithoutPassword;
  tokens: { accessToken: string; refreshToken: string };
}> => {
  return prismaClient.$transaction(async (tx) => {
    // First, operation in the transaction
    const user = await usersRepository.createUser(signUpDto, tx);
    const tokens = await getTokens(user.id, user.email);

    // Second operation in the transaction
    await updateRefreshToken(user.id, tokens.refreshToken, tx);

    const defaultBookshelves: CreateBookshelfDto[] = buildDefaultBookshelves(
      user.id
    );
    // Third operation in the transaction
    for (const defaultBookshelf of defaultBookshelves) {
      await bookshelvesRepository.createBookshelf(defaultBookshelf, tx);
    }
    console.log("User created with default bookshelves");

    return { user, tokens };
  });
};

export const logIn = async (
  logInDto: LogInDto
): Promise<{
  user: IUserWithoutPassword;
  tokens: { accessToken: string; refreshToken: string };
}> => {
  const user = await usersService.validateCredentials(
    logInDto.email,
    logInDto.password
  );

  const tokens = await getTokens(user.id, user.email);
  await updateRefreshToken(user.id, tokens.refreshToken);

  return { user, tokens };
};

export const logOut = async (userId: number): Promise<void> => {
  await usersService.updateUserById(userId, { refreshToken: undefined });
};

export const refreshTokens = async (
  userId: number,
  refreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  let decodedToken: jwt.JwtPayload;
  const refreshTokenSecret = config.refreshToken.secret;
  if (!refreshTokenSecret)
    throw new HttpException("Unauthorized: Invalid token", 401);
  try {
    decodedToken = jwt.verify(
      refreshToken,
      refreshTokenSecret
    ) as jwt.JwtPayload;
  } catch (err) {
    throw new HttpException("Unauthorized: Invalid token", 401);
  }

  if (!decodedToken.sub || parseInt(decodedToken.sub, 10) !== userId)
    throw new HttpException("Unauthorized: Invalid token", 401);

  const user = await usersService.getUserById(userId);
  if (!user.refreshToken)
    throw new HttpException("Unauthorized: No refresh token found", 401);

  const refreshTokensMatch = await bcrypt.compare(
    refreshToken,
    user.refreshToken
  );
  if (!refreshTokensMatch)
    throw new HttpException("Unauthorized: token mismatch", 401);

  const tokens = await getTokens(user.id, user.email);
  await updateRefreshToken(user.id, tokens.refreshToken);

  return tokens;
};

export const getTokens = async (
  userId: number,
  email: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  const payload: JwtPayload = { sub: userId, email };

  const refreshTokenSecret = config.refreshToken.secret;
  const accessTokenSecret = config.accessToken.secret;
  if (!refreshTokenSecret || !accessTokenSecret)
    throw new HttpException("Unauthorized: Invalid token", 401);
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: config.accessToken.expiresIn,
  });
  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: config.refreshToken.expiresIn,
  });

  return { accessToken, refreshToken };
};

export const updateRefreshToken = async (
  userId: number,
  refreshToken: string,
  tx?: Transaction
): Promise<void> => {
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

  await usersRepository.updateUserById(
    userId,
    {
      refreshToken: hashedRefreshToken,
    },
    tx
  );
};

export default {
  signUp,
  logIn,
  logOut,
  refreshTokens,
};
