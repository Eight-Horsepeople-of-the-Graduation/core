import prisma from "../utils/prisma";

export const getBookshelves = async () => {
  const bookshelves = await prisma.bookshelf.findMany();

  return bookshelves;
};

export const getBookshelf = async (title: string) => {
  try {
    return await prisma.bookshelf.findFirst({
      where: {
        title: title,
      },
    });
  } catch (error) {
    console.error("Error finding Book:", error);
  }
};

export const addBookshelf = async (bookshelfInfo: {
  title: string;
  userId: number;
}) => {
  const { title, userId } = bookshelfInfo;
  const bookshelf = await prisma.bookshelf.create({
    data: { title, userId },
  });
  return bookshelf;
};