/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsersDocs } from './users.swagger';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BooksDocs } from './books.swagger';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BookshelvesDocs } from './bookshelves.swagger';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ReadingChallengesDocs } from './reading-challenges.swagger';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConversationsSwagger } from './conversations.swagger';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Gender": {
        "dataType": "refEnum",
        "enums": ["MALE","FEMALE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IUser": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "gender": {"ref":"Gender","required":true},
            "birthDate": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "joinDate": {"dataType":"datetime","required":true},
            "profilePicture": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "isAdmin": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchQueryDto": {
        "dataType": "refObject",
        "properties": {
            "term": {"dataType":"string"},
            "page": {"dataType":"double"},
            "limit": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserDto": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "gender": {"ref":"Gender","required":true},
            "birthDate": {"dataType":"datetime"},
            "profilePicture": {"dataType":"string"},
            "isAdmin": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateUserDto": {
        "dataType": "refObject",
        "properties": {
            "username": {"dataType":"string"},
            "email": {"dataType":"string"},
            "password": {"dataType":"string"},
            "country": {"dataType":"string"},
            "gender": {"ref":"Gender"},
            "birthDate": {"dataType":"datetime"},
            "profilePicture": {"dataType":"string"},
            "isAdmin": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Format": {
        "dataType": "refEnum",
        "enums": ["PAPERBACK","HARDCOVER","EBOOK"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBook": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "publishDate": {"dataType":"datetime","required":true},
            "format": {"ref":"Format","required":true},
            "language": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "numOfPages": {"dataType":"double","required":true},
            "pdfLink": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAuthorDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetGenreDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "language": {"dataType":"string","required":true},
            "format": {"ref":"Format","required":true},
            "country": {"dataType":"string","required":true},
            "numOfPages": {"dataType":"double","required":true},
            "publishDate": {"dataType":"datetime","required":true},
            "pdfLink": {"dataType":"string","required":true},
            "authors": {"dataType":"array","array":{"dataType":"refObject","ref":"GetAuthorDto"},"required":true},
            "genres": {"dataType":"array","array":{"dataType":"refObject","ref":"GetGenreDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBookDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "language": {"dataType":"string","required":true},
            "format": {"ref":"Format","required":true},
            "country": {"dataType":"string","required":true},
            "numOfPages": {"dataType":"double","required":true},
            "publishDate": {"dataType":"datetime","required":true},
            "pdfLink": {"dataType":"string","required":true},
            "authors": {"dataType":"array","array":{"dataType":"refObject","ref":"GetAuthorDto"},"required":true},
            "genres": {"dataType":"array","array":{"dataType":"refObject","ref":"GetGenreDto"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Privacy": {
        "dataType": "refEnum",
        "enums": ["PUBLIC","PRIVATE"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IBookshelf": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "privacy": {"ref":"Privacy","required":true},
            "userId": {"dataType":"double","required":true},
            "books": {"dataType":"array","array":{"dataType":"refObject","ref":"IBook"},"required":true},
            "user": {"ref":"IUser","required":true},
            "_count": {"dataType":"nestedObjectLiteral","nestedProperties":{"books":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateBookshelfDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "privacy": {"ref":"Privacy","required":true},
            "userId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateBookshelfDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string"},
            "description": {"dataType":"string"},
            "privacy": {"ref":"Privacy"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Duration": {
        "dataType": "refEnum",
        "enums": ["WEEKLY","MONTHLY","ANNUAL"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IReadingChallenge": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "type": {"ref":"Duration","required":true},
            "startDate": {"dataType":"datetime","required":true},
            "progress": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "books": {"dataType":"array","array":{"dataType":"refObject","ref":"IBook"},"required":true},
            "_count": {"dataType":"nestedObjectLiteral","nestedProperties":{"books":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateReadingChallengeDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "type": {"ref":"Duration","required":true},
            "userId": {"dataType":"double","required":true},
            "progress": {"dataType":"double","required":true},
            "startDate": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateReadingChallengeDto": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "progress": {"dataType":"double","required":true},
            "type": {"ref":"Duration","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IMessage": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdOn": {"dataType":"datetime","required":true},
            "role": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
            "conversationId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IConversation": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "createdOn": {"dataType":"datetime","required":true},
            "retriever": {"dataType":"string","required":true},
            "memory": {"dataType":"string","required":true},
            "llm": {"dataType":"string","required":true},
            "bookId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "messages": {"dataType":"array","array":{"dataType":"refObject","ref":"IMessage"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateConversationDto": {
        "dataType": "refObject",
        "properties": {
            "retriever": {"dataType":"string","required":true},
            "memory": {"dataType":"string","required":true},
            "llm": {"dataType":"string","required":true},
            "bookId": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateMessageDto": {
        "dataType": "refObject",
        "properties": {
            "role": {"dataType":"string","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UsersDocs)),
            ...(fetchMiddlewares<RequestHandler>(UsersDocs.prototype.getAllUsers)),

            async function UsersDocs_getAllUsers(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    filter: {"in":"queries","name":"filter","required":true,"ref":"SearchQueryDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersDocs();

              await templateService.apiHandler({
                methodName: 'getAllUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersDocs)),
            ...(fetchMiddlewares<RequestHandler>(UsersDocs.prototype.getUserById)),

            async function UsersDocs_getUserById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersDocs();

              await templateService.apiHandler({
                methodName: 'getUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UsersDocs)),
            ...(fetchMiddlewares<RequestHandler>(UsersDocs.prototype.createUser)),

            async function UsersDocs_createUser(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userData: {"in":"body","name":"userData","required":true,"ref":"CreateUserDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersDocs();

              await templateService.apiHandler({
                methodName: 'createUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersDocs)),
            ...(fetchMiddlewares<RequestHandler>(UsersDocs.prototype.updateUserById)),

            async function UsersDocs_updateUserById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    updatedData: {"in":"body","name":"updatedData","required":true,"ref":"UpdateUserDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersDocs();

              await templateService.apiHandler({
                methodName: 'updateUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UsersDocs)),
            ...(fetchMiddlewares<RequestHandler>(UsersDocs.prototype.deleteUserById)),

            async function UsersDocs_deleteUserById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new UsersDocs();

              await templateService.apiHandler({
                methodName: 'deleteUserById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/books',
            ...(fetchMiddlewares<RequestHandler>(BooksDocs)),
            ...(fetchMiddlewares<RequestHandler>(BooksDocs.prototype.getAllBooks)),

            async function BooksDocs_getAllBooks(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    searchQueryDto: {"in":"queries","name":"searchQueryDto","required":true,"ref":"SearchQueryDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksDocs();

              await templateService.apiHandler({
                methodName: 'getAllBooks',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/books/:id',
            ...(fetchMiddlewares<RequestHandler>(BooksDocs)),
            ...(fetchMiddlewares<RequestHandler>(BooksDocs.prototype.getBookById)),

            async function BooksDocs_getBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksDocs();

              await templateService.apiHandler({
                methodName: 'getBookById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/books',
            ...(fetchMiddlewares<RequestHandler>(BooksDocs)),
            ...(fetchMiddlewares<RequestHandler>(BooksDocs.prototype.createBook)),

            async function BooksDocs_createBook(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    createBookDto: {"in":"body","name":"createBookDto","required":true,"ref":"CreateBookDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksDocs();

              await templateService.apiHandler({
                methodName: 'createBook',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/books/:id',
            ...(fetchMiddlewares<RequestHandler>(BooksDocs)),
            ...(fetchMiddlewares<RequestHandler>(BooksDocs.prototype.updateBookById)),

            async function BooksDocs_updateBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    updateBookDto: {"in":"body","name":"updateBookDto","required":true,"ref":"UpdateBookDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksDocs();

              await templateService.apiHandler({
                methodName: 'updateBookById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/books/:id',
            ...(fetchMiddlewares<RequestHandler>(BooksDocs)),
            ...(fetchMiddlewares<RequestHandler>(BooksDocs.prototype.deleteBookById)),

            async function BooksDocs_deleteBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksDocs();

              await templateService.apiHandler({
                methodName: 'deleteBookById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/bookshelves',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.getAllBookshelves)),

            async function BookshelvesDocs_getAllBookshelves(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    searchQueryDto: {"in":"queries","name":"searchQueryDto","required":true,"ref":"SearchQueryDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'getAllBookshelves',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/bookshelves/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.getBookshelfById)),

            async function BookshelvesDocs_getBookshelfById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'getBookshelfById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/bookshelves/user/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.getBookshelvesByUserId)),

            async function BookshelvesDocs_getBookshelvesByUserId(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'getBookshelvesByUserId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/bookshelves',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.createBookshelf)),

            async function BookshelvesDocs_createBookshelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    data: {"in":"body","name":"data","required":true,"ref":"CreateBookshelfDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'createBookshelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/bookshelves/add-books/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.addBookToBookshelf)),

            async function BookshelvesDocs_addBookToBookshelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    bookIds: {"in":"body","name":"bookIds","required":true,"dataType":"array","array":{"dataType":"double"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'addBookToBookshelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.patch('/bookshelves/remove-books/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.removeBooksFromBookshelf)),

            async function BookshelvesDocs_removeBooksFromBookshelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    bookIds: {"in":"body","name":"bookIds","required":true,"dataType":"array","array":{"dataType":"double"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'removeBooksFromBookshelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/bookshelves/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.updateBookshelf)),

            async function BookshelvesDocs_updateBookshelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    updateBookshelfDto: {"in":"body","name":"updateBookshelfDto","required":true,"ref":"UpdateBookshelfDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'updateBookshelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/bookshelves/:id',
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs)),
            ...(fetchMiddlewares<RequestHandler>(BookshelvesDocs.prototype.deleteBookshelf)),

            async function BookshelvesDocs_deleteBookshelf(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BookshelvesDocs();

              await templateService.apiHandler({
                methodName: 'deleteBookshelf',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/reading-challenges',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.getAllReadingChallenges)),

            async function ReadingChallengesDocs_getAllReadingChallenges(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'getAllReadingChallenges',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/reading-challenges/:id',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.getReadingChallengeById)),

            async function ReadingChallengesDocs_getReadingChallengeById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'getReadingChallengeById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/reading-challenges/user/:userId',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.getReadingChallengesByUserId)),

            async function ReadingChallengesDocs_getReadingChallengesByUserId(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    userId: {"in":"path","name":"userId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'getReadingChallengesByUserId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/reading-challenges/add-book/:readingChallengeId',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.addBookToReadingChallenge)),

            async function ReadingChallengesDocs_addBookToReadingChallenge(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    readingChallengeId: {"in":"path","name":"readingChallengeId","required":true,"dataType":"double"},
                    bookId: {"in":"body","name":"bookId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'addBookToReadingChallenge',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/reading-challenges',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.createReadingChallenge)),

            async function ReadingChallengesDocs_createReadingChallenge(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    readingChallengeData: {"in":"body","name":"readingChallengeData","required":true,"ref":"CreateReadingChallengeDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'createReadingChallenge',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/reading-challenges/:id',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.updateReadingChallenge)),

            async function ReadingChallengesDocs_updateReadingChallenge(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    updatedData: {"in":"body","name":"updatedData","required":true,"ref":"UpdateReadingChallengeDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'updateReadingChallenge',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/reading-challenges/:id',
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs)),
            ...(fetchMiddlewares<RequestHandler>(ReadingChallengesDocs.prototype.deleteReadingChallenge)),

            async function ReadingChallengesDocs_deleteReadingChallenge(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ReadingChallengesDocs();

              await templateService.apiHandler({
                methodName: 'deleteReadingChallenge',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/conversations',
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger.prototype.getAllConversations)),

            async function ConversationsSwagger_getAllConversations(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ConversationsSwagger();

              await templateService.apiHandler({
                methodName: 'getAllConversations',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/conversations/:id',
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger.prototype.getConversationById)),

            async function ConversationsSwagger_getConversationById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ConversationsSwagger();

              await templateService.apiHandler({
                methodName: 'getConversationById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/conversations',
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger.prototype.createConversation)),

            async function ConversationsSwagger_createConversation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    conversationData: {"in":"body","name":"conversationData","required":true,"ref":"CreateConversationDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ConversationsSwagger();

              await templateService.apiHandler({
                methodName: 'createConversation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/conversations/:conversationId/messages',
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger.prototype.createMessage)),

            async function ConversationsSwagger_createMessage(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    messageData: {"in":"body","name":"messageData","required":true,"ref":"CreateMessageDto"},
                    conversationId: {"in":"path","name":"conversationId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ConversationsSwagger();

              await templateService.apiHandler({
                methodName: 'createMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/conversations/:conversationId/messages',
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger)),
            ...(fetchMiddlewares<RequestHandler>(ConversationsSwagger.prototype.getMessagesByConversationId)),

            async function ConversationsSwagger_getMessagesByConversationId(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    conversationId: {"in":"path","name":"conversationId","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new ConversationsSwagger();

              await templateService.apiHandler({
                methodName: 'getMessagesByConversationId',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
