import { Gender } from "../dtos";
export interface IUser {
  id: number;
  username: string;
  email: string;
  country: string;
  gender: Gender;
  birthDate: Date | null;
  joinDate: Date;
  profilePicture: string | null;
  isAdmin: boolean;
}
