import { Request, Response } from 'express';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest } from '../../shared/interfaces/http';

export const adaptRoute = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		const httpRequest: HttpRequest = {
			body: req.body,
			params: req.params,
			query: req.query,
			user: req.user,
		};
		const httpResponse = await controller.handle({ ...httpRequest });

		if (httpResponse.statusCode === 200) {
			res.status(httpResponse.statusCode).json(httpResponse.body);
		} else {
			const errorResponse = httpResponse.body.message ? { error: httpResponse.body.message } : { error: httpResponse.body };
			res.status(httpResponse.statusCode).json(errorResponse);
		}
	};
};
