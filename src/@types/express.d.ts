import { Payload } from '../shared/interfaces/http';

declare global {
	namespace Express {
		interface Request {
			user: Payload;
		}
	}
}
