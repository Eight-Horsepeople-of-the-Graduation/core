import {
  CreateBookshelfDto,
  Privacy,
} from "@modules/bookshelves/dtos/bookshelves.dto";

export const buildDefaultBookshelves = (
  userId: number
): CreateBookshelfDto[] => {
  return [
    {
      title: "Done Reading",
      userId: userId,
      description: "A bookshelf for books that you have already read.",
      privacy: Privacy.PUBLIC,
    },
    {
      title: "Currently Reading",
      userId: userId,
      description: "A bookshelf for books that you are currently reading.",
      privacy: Privacy.PUBLIC,
    },
    {
      title: "Want to Read",
      userId: userId,
      description: "A bookshelf for books that you want to read in the future.",
      privacy: Privacy.PUBLIC,
    },
  ];
};
