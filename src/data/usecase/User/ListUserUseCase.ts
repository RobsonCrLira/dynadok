import { UserRepository } from '../../../database/interfaces/UserRepository';
import redisCache from '../../../infra/cache/redis';

export class ListUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async listAll() {
		const cacheKey = 'users:all';
		const cachedUsers = await redisCache.getValue(cacheKey);

		if (cachedUsers) {
			return JSON.parse(cachedUsers);
		}

		const users = await this.userRepository.getAll();

		await redisCache.setValue(cacheKey, JSON.stringify(users), 3600);

		return users;
	}
}
