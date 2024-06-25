import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Put,
    Query,
    Route,
    SuccessResponse,
    Queries,
    Delete,
    Tags,
    Patch,
  } from "tsoa";
import {
  CreateBookshelfDto,
  Gender,
  GetBookshelfByIdDto,
  SearchQueryDto,
  UpdateBookshelfDto,
} from "../dtos";
import bookshelvesRepository from "@repositories/bookshelves.repository";
import { IBook } from "./books.swagger";
import { Privacy } from "../dtos";
interface IUser {
    "id": number,
    "username": string,
    "email": string,
    "password": string,
    "country": string,
    "gender": Gender,
    "birthDate": Date | null,
    "joinDate": Date,
    "profilePicture": string | null,
    "isAdmin": boolean
}
interface IBookshelf {
    "id": number,
    "title": string,
    "description": string,
    "createdAt": Date,
    "privacy": Privacy,
    "userId": number,
    "books": IBook[],
    "user": IUser,
    "_count": {
      "books": number
    }
  }

@Route("bookshelves")
@Tags("Bookshelves")
export class BookshelvesDocs {
    @Get("/")
    public getAllBookshelves(@Queries() searchQueryDto: SearchQueryDto) : IBookshelf[] | any{};

    @Get("/:id")
    public getBookshelfById(
    @Path() id: number
    ) : IBookshelf | any{}
      
    @Get("/user/:id")
    public getBookshelvesByUserId(@Path() id: number) : IBookshelf[] | any{}

    @Post("")
    public createBookshelf(@Body() data: CreateBookshelfDto) : IBookshelf | any{};
    
    @Patch("/add-books/:id")
    public addBookToBookshelf(
    @Path() id: number,
    @Body() bookIds: number[]
    ) : IBookshelf | any{};

    @Patch("/remove-books/:id")
    public removeBooksFromBookshelf(
    @Path() id: number,
    @Body() bookIds: number[]
    ) : IBookshelf | any{};
    
    @Put("/:id")
    public updateBookshelf(
    @Path() id: number,
    @Body() updateBookshelfDto: UpdateBookshelfDto
    ) : IBookshelf | any{};
    
    @Delete("/:id")
    public deleteBookshelf(@Path() id: number) : IBookshelf | any{}
}

