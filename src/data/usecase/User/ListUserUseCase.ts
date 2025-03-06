import redisClient from '../../../config/redis';
import { UserRepository } from '../../../database/interfaces/UserRepository';

export class ListUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async listAll() {
		const cacheKey = 'users:all';
		const cachedUsers = await redisClient.get(cacheKey);

		if (cachedUsers) {
			return JSON.parse(cachedUsers);
		}

		const users = await this.userRepository.getAll();

		await redisClient.set(cacheKey, JSON.stringify(users), {
			EX: 3600, // Expire in 1 hour
		});

		return users;
	}
}
