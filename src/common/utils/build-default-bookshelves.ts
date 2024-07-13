import {
  CreateBookshelfDto,
  Privacy,
} from "@modules/bookshelves/dtos/bookshelves.dto";

export const doneReadingInfo = {
  title: "Done Reading".toLowerCase(),
  description:
    "A bookshelf for books that you have already read.".toLowerCase(),
  privacy: Privacy.PUBLIC,
};

export const currentlyReadingInfo = {
  title: "Currently Reading".toLowerCase(),
  description:
    "A bookshelf for books that you are currently reading.".toLowerCase(),
  privacy: Privacy.PUBLIC,
};

export const wantToReadInfo = {
  title: "Want to Read".toLowerCase(),
  description:
    "A bookshelf for books that you want to read in the future.".toLowerCase(),
  privacy: Privacy.PUBLIC,
};

export const getDefaultTitles = () => {
  return [
    doneReadingInfo.title,
    currentlyReadingInfo.title,
    wantToReadInfo.title,
  ];
};

export const buildDefaultBookshelves = (
  userId: number
): CreateBookshelfDto[] => {
  return [
    {
      title: doneReadingInfo.title,
      userId: userId,
      description: doneReadingInfo.description,
      privacy: doneReadingInfo.privacy,
    },
    {
      title: currentlyReadingInfo.title,
      userId: userId,
      description: currentlyReadingInfo.description,
      privacy: currentlyReadingInfo.privacy,
    },
    {
      title: wantToReadInfo.title,
      userId: userId,
      description: wantToReadInfo.description,
      privacy: wantToReadInfo.privacy,
    },
  ];
};
