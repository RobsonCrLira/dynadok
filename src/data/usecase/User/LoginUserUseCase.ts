import { UserRepository } from "../../../database/interfaces/UserRepository";
import { IUserUseCase } from "../../../shared/interfaces/userUseCase";
import { CryptographyUseCase } from "../Cryptography/CryptographyUseCase";

export class LoginUserUseCase implements IUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cryptographyUseCase: CryptographyUseCase,
	) {}

	async execute(data: { email: string; password: string }) {
		const user = await this.userRepository.findByEmail(data.email);
		if (!user) {
			return null;
		}
		const isValidPassword = await this.cryptographyUseCase.compare(data.password, user.password_hash);
		if (!isValidPassword) {
			return null;
		}
		const token = await this.cryptographyUseCase.encrypt({ user_id: user.user_id, email: user.email });
		return { token, name: user.name, user_id: user.user_id };
	}
}
