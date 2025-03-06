import { AuthMiddleware } from '../../middleware/AuthMiddleware';
import { Middleware } from '../../shared/interfaces/middleware';

export const makeAuthMiddleware = (): Middleware => {
	return new AuthMiddleware();
};
