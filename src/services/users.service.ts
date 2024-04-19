import { UserDto } from "../dtos/user.dto";
import { IService } from "../interfaces/service.interface";
import prisma from "../utils/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (userData: UserDto) => {
  const { username, email, password, country, gender } = userData;

  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
      country,
      gender,
    },
  });

  return user;
};

// export class UserService implements IService {
//   async getAll() {
//     const users = await prisma.user.findMany();

//     return users;
//   }

//   async create(userData: UserDto) {
//     const { username, email, password, country, gender } = userData;

//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password,
//         country,
//         gender,
//       },
//     });

//     return user;
//   }

//   updateById(id: number, dto: any): Promise<any> {}

//   deleteById(id: string): Promise<any> {}
// }
