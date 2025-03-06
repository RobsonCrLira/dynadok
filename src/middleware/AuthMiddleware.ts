import jwt from 'jsonwebtoken';
import { appConfig } from '../config/env';
import { UnauthorizedError } from '../shared/errors';
import { ok, serverError, unauthorized } from '../shared/http/httpHelpers';
import { HttpRequest, HttpResponse, Payload } from '../shared/interfaces/http';
import { Middleware } from '../shared/interfaces/middleware';

export class AuthMiddleware implements Middleware {
	constructor(private readonly roles?: string[]) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		const auth = httpRequest.headers['authorization'];
		if (!auth?.startsWith('Bearer ')) {
			return unauthorized(new UnauthorizedError());
		}
		const [, token] = auth.split(' ');

		try {
			const payload = jwt.verify(token, appConfig.secret) as Payload;
			const hasRole = this.roles.includes(payload.role.name);
			if (!hasRole) {
				return unauthorized(new UnauthorizedError());
			}
			if (!payload) {
				return unauthorized(new UnauthorizedError());
			}

			return ok({ user: payload });
		} catch (error) {
			return serverError(error);
		}
	}
}
