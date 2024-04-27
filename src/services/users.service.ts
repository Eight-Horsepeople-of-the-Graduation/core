import { CreateUserDto, UpdateUserDto } from "../dtos";
import prisma from "../utils/prisma";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany();

  return users;
};

export const createUser = async (userData: CreateUserDto) => {
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

export const updateUserById = async (id: number, dto: UpdateUserDto) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: dto,
  });

  return user;
};

export const deleteUserById = async (id: number) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  });

  return user;
};

// export class UserService {
//   constructor(private readonly userRepository: UserRepostiory)

//   async getAllUsers() {}

//   async createUser() {}

//   async updateUserById() {}

//   async deleteUserById() {}
// }

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
