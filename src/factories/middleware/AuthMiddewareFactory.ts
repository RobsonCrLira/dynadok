import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { Middleware } from '../../shared/interfaces/middleware';

export const makeAuthMiddleware = (roles?: string[]): Middleware => {
	return new AuthMiddleware(roles);
};
