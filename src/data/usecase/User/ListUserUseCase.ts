import { UserRepository } from "../../../database/interfaces/UserRepository";

export class ListUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async listAll() {
		const users = await this.userRepository.getAll();

		return users;
	}
}
