import { UserRepository } from "../../../database/interfaces/UserRepository";
import redisCache from "../../../infra/cache/redis";

export class LoadUserUseCase {
	cacheKey = "users:id";
	constructor(private readonly userRepository: UserRepository) {}

	async loadById(user_id: string) {
		const cachedUser = await redisCache.getValue(this.cacheKey);

		if (cachedUser) {
			const user = JSON.parse(cachedUser);
			if (user.user_id === user_id) {
				delete user?.password_hash;
				delete user?.password;
				return user;
			}
		}

		const user = await this.userRepository.findById(user_id);
		delete user?.password_hash;
		delete user?.password;

		await redisCache.setValue(this.cacheKey, JSON.stringify(user), 3600);

		return user;
	}

	async loadByEmail(email: string) {
		const cachedUser = await redisCache.getValue(this.cacheKey);

		if (cachedUser) {
			const user = JSON.parse(cachedUser);
			if (user.email === email) {
				delete user?.password_hash;
				delete user?.password;
				return user;
			}
		}
		const user = await this.userRepository.findByEmail(email);
		delete user?.password_hash;
		delete user?.password;

		await redisCache.setValue(this.cacheKey, JSON.stringify(user), 3600);
		return user;
	}
}
