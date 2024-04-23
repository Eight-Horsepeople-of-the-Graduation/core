export class UserDto {
  public username!: string;
  public email!: string;
  public password!: string;
  public country!: string;
  public gender!: Gender;
}

enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
