import prisma from "../utils/prisma";

export const getAllLists = async () => {
  const lists = await prisma.list.findMany();

  return lists;
};

export const createList = async (listData: {
  title: any;
  description: any;
  userId: any;
  numOfBooks: any;
}) => {
  const { title, description, userId, numOfBooks } = listData;

  const list = await prisma.list.create({
    data: {
      title,
      description,
      userId,
      numOfBooks,
    },
  });

  return list;
};
