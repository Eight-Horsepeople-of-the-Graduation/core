import prisma from "../utils/prisma";

export const getAllBookshelves = async () => {
  const bookshelves = await prisma.bookshelf.findMany();

  return bookshelves;
};

export const getBookshelf = async (title: string) => {
  const bookshelf = await prisma.bookshelf.findFirst({
    where: {
      title: title,
    },
  });

  return bookshelf;
};

export const createBookshelf = async (bookshelfInfo: {
  title: string;
  userId: number;
}) => {
  const { title, userId } = bookshelfInfo;
  const bookshelf = await prisma.bookshelf.create({
    data: { title, userId }, // won't work until I migrate
  });

  return bookshelf;
};

export default {
  getAllBookshelves,
  getBookshelf,
  createBookshelf,
};
