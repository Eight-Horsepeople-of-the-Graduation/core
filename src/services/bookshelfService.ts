import prisma from "../utils/prisma";

export const getBookshelves = async () => {
  const bookshelves = await prisma.bookshelf.findMany();

  return bookshelves;
};

export const getBookshelf = async (title: string) => {
  try {
    return await prisma.bookshelf.findUnique({
      where: {
        title: title,
      },
    });
  } catch (error) {
    console.error("Error finding Book:", error);
  }
};

export const addBookshelf = async (bookshelfInfo: { title: any }) => {
  const { title } = bookshelfInfo;
  // TODO: add automatic total sum of books on said shelf
  const bookshelf = await prisma.bookshelf.create({
    data: { title },
  });
  return bookshelf;
};
