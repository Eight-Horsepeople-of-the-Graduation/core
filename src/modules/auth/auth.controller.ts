import { Request, Response } from "express";
import config from "../../config";
import authService from "@modules/auth/auth.service";
import { IUserWithoutPassword } from "@common/interfaces/users.interface";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const signUpDto = req.body;

  const { user, tokens } = await authService.signUp(signUpDto);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.refreshToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("accessToken", tokens.accessToken, {
    maxAge: config.accessToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });

  return res.send({ user, tokens });
};

export const logIn = async (
  req: Request,
  res: Response
): Promise<Response<IUserWithoutPassword>> => {
  const logInDto = req.body;

  const { user, tokens } = await authService.logIn(logInDto);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: config.refreshToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("accessToken", tokens.accessToken, {
    maxAge: config.accessToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });

  return res.send({ user, tokens });
};

export const logOut = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  const userId = req.user.sub;
  await authService.logOut(userId);

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  return res.sendStatus(200);
};

export const refreshTokens = async (
  req: Request,
  res: Response
): Promise<Response<any>> => {
  const { accessToken, refreshToken } = await authService.refreshTokens(
    parseInt(req.user.id, 10),
    req.user.refreshToken
  );
  if (!accessToken || !refreshToken) return res.sendStatus(401);

  res.cookie("refreshToken", refreshToken, {
    maxAge: config.refreshToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });
  res.cookie("accessToken", accessToken, {
    maxAge: config.accessToken.expiresIn,
    httpOnly: true,
    sameSite: "none",
  });

  return res.sendStatus(200);
};

export default {
  signUp,
  logIn,
  logOut,
  refreshTokens,
};
