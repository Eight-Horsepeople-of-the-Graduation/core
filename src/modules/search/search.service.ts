import booksService from "@modules/books/books.service";
import bookshelvesService from "@modules/bookshelves/bookshelves.service";
import { SearchQueryDto } from "@modules/search/dtos/search.dto";
import usersService from "@modules/users/users.service";

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
