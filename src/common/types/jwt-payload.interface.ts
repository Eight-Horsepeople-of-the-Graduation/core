export interface JwtPayload {
  sub: number;
  email: string;
  exp?: number;
  iat?: number;
}
