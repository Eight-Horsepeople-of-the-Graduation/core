/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BooksService } from './books.swagger';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "format": {
        "dataType": "refEnum",
        "enums": [0,1,2],
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
            "format": {"ref":"format","required":true},
            "language": {"dataType":"string","required":true},
            "country": {"dataType":"string","required":true},
            "numOfPages": {"dataType":"double","required":true},
            "pdfLink": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SearchQueryDto": {
        "dataType": "refObject",
        "properties": {
            "term": {"dataType":"string"},
            "page": {"dataType":"double"},
            "limit": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Format": {
        "dataType": "refEnum",
        "enums": ["PAPERBACK","HARDCOVER","EBOOK"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetAuthorDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetGenreDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
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
        "additionalProperties": true,
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
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/books',
            ...(fetchMiddlewares<RequestHandler>(BooksService)),
            ...(fetchMiddlewares<RequestHandler>(BooksService.prototype.getAllBooks)),

            async function BooksService_getAllBooks(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    searchQueryDto: {"in":"queries","name":"searchQueryDto","required":true,"ref":"SearchQueryDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksService();

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
            ...(fetchMiddlewares<RequestHandler>(BooksService)),
            ...(fetchMiddlewares<RequestHandler>(BooksService.prototype.getBookById)),

            async function BooksService_getBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksService();

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
            ...(fetchMiddlewares<RequestHandler>(BooksService)),
            ...(fetchMiddlewares<RequestHandler>(BooksService.prototype.createBook)),

            async function BooksService_createBook(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    createBookDto: {"in":"body","name":"createBookDto","required":true,"ref":"CreateBookDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksService();

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
            ...(fetchMiddlewares<RequestHandler>(BooksService)),
            ...(fetchMiddlewares<RequestHandler>(BooksService.prototype.updateBookById)),

            async function BooksService_updateBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
                    updateBookDto: {"in":"body","name":"updateBookDto","required":true,"ref":"UpdateBookDto"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksService();

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
            ...(fetchMiddlewares<RequestHandler>(BooksService)),
            ...(fetchMiddlewares<RequestHandler>(BooksService.prototype.deleteBookById)),

            async function BooksService_deleteBookById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    id: {"in":"path","name":"id","required":true,"dataType":"double"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const controller = new BooksService();

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

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
