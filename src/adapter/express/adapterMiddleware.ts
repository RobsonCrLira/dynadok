import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../../shared/interfaces/http';
import { Middleware } from '../../shared/interfaces/middleware';

export const adaptMiddleware = (middleware: Middleware) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		const httpRequest: HttpRequest = {
			user: req.user,
			headers: req.headers,
		};
		const httpResponse = await middleware.handle(httpRequest);
		if (httpResponse.statusCode === 200) {
			Object.assign(req, httpResponse.body);
			next();
		} else {
			res.status(httpResponse.statusCode).json({
				error: httpResponse.body,
			});
		}
	};
};
