import { SearchQueryDto } from "@dtos";
import booksService from "@services/books.service";
import bookshelvesService from "@services/bookshelves.service";
import usersService from "@services/users.service";

export const search = async (query: SearchQueryDto) => {
  const [books, bookshelves, users] = await Promise.all([
    booksService.getAllBooks(query),
    bookshelvesService.getAllBookshelves(query),
    usersService.getAllUsers(query),
  ]);

  return {
    books,
    bookshelves,
    users,
  };
};

export default {
  search,
};
