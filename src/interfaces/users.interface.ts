export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  country: string;
  gender: "MALE" | "FEMALE";
  refreshToken: string | null;
  birthDate: Date | null;
  joinDate: Date;
  profilePicture: string | null;
  isAdmin: boolean;
}

export type OptionalUser = IUser | null;
export type IUserWithoutPassword = Omit<IUser, "password">;
export type OptionalUserWithoutPassword = IUserWithoutPassword | null;
export type BookshelfUser = Pick<IUser, "name" | "username" | "profilePicture">;
export type ReviewUser = Pick<IUser, "name" | "username" | "profilePicture">;
export type RequestUser = Pick<
  IUser,
  "id" | "name" | "username" | "profilePicture" | "isAdmin"
>;

export const SelectUserWithoutPassword = {
  id: true,
  name: true,
  username: true,
  email: true,
  country: true,
  gender: true,
  refreshToken: true,
  profilePicture: true,
  isAdmin: true,
  birthDate: true,
  joinDate: true,
  updatedAt: true,
};