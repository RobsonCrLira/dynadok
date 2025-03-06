import { UserRepository } from "../../../database/interfaces/UserRepository";
import { IUserUseCase } from "../../../shared/interfaces/userUseCase";

export class ListUserUseCase implements IUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute() {
		const users = await this.userRepository.getAll();
		return users;
	}
}
