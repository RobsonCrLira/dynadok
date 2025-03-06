import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { appConfig } from '../../../config/env';
import { UnauthorizedError } from '../../../shared/errors';

export class CryptographyUseCase {
	async encrypt(payload: object): Promise<string> {
		const token = jwt.sign(payload, appConfig.secret, { expiresIn: appConfig.expiresIn });
		return token;
	}

	async decrypt(token: string) {
		try {
			const payload = jwt.verify(token, appConfig.secret);
			return payload;
		} catch (_error) {
			return new UnauthorizedError();
		}
	}

	async hash(data: string): Promise<string> {
		const passwordHash = await bcrypt.hash(data, 12);
		return passwordHash;
	}

	async compare(data: string, hash: string): Promise<boolean> {
		return bcrypt.compare(data, hash);
	}
}
