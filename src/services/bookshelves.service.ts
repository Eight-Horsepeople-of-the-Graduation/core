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
  description: string;
  privacy: "PUBLIC" | "PRIVATE";
  userId: number;
}) => {
  const { title, userId, description, privacy } = bookshelfInfo;

  const bookshelf = await prisma.bookshelf.create({
    data: { title, description, privacy, userId },
  });

  return bookshelf;
};

export default {
  getAllBookshelves,
  getBookshelf,
  createBookshelf,
};
