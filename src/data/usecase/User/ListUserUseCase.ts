import { UserRepository } from "../../../database/interfaces/UserRepository";

export class ListUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}
	async listAll() {
		const user = await this.userRepository.getAll();
		return user;
	}
}
