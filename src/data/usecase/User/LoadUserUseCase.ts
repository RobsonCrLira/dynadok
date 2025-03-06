import { UserRepository } from '../../../database/interfaces/UserRepository';

export class LoadUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}
	async loadById(user_id: string) {
		const user = await this.userRepository.findById(user_id);
		return user;
	}

	async loadByEmail(email: string) {
		const user = await this.userRepository.findByEmail(email);
		return user;
	}
}
