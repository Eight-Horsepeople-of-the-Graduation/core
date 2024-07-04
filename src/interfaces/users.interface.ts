export interface IUser {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  country: string;
  gender: "MALE" | "FEMALE";
  birthDate: Date | null;
  joinDate: Date;
  profilePicture: string | null;
  isAdmin: boolean;
}


export type OptionalUser = IUser | null;
export type UserWithoutPassword = Omit<IUser, "password">;
