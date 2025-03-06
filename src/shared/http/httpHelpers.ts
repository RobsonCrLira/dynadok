import { AccessDeniedError, ServerError, UnauthorizedError } from '../errors';
import { HttpResponse } from '../interfaces/http';

export const badRequest = (error: Error): HttpResponse => ({
	statusCode: 400,
	body: error,
});

export const badRequestCustom = (data: any): HttpResponse => ({
	statusCode: 400,
	body: JSON.parse(data.message),
});

export const unauthorized = (error?: Error): HttpResponse => ({
	statusCode: 401,
	body: new UnauthorizedError(error),
});

export const forbidden = (_error?: Error): HttpResponse => ({
	statusCode: 403,
	body: new AccessDeniedError(),
});

export const notFound = (error: Error): HttpResponse => ({
	statusCode: 404,
	body: error,
});

export const serverError = (error: Error | any): HttpResponse => ({
	statusCode: 500,
	body: new ServerError(error),
});

export const ok = (data: any): HttpResponse => ({
	statusCode: 200,
	body: data,
});

export const created = (data: any): HttpResponse => ({
	statusCode: 201,
	body: data,
});
