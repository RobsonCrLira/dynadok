import { IUser, UserRepository } from "../../../database/interfaces/UserRepository";
import { EmailInUseError } from "../../../shared/errors";
import { IUserUseCase } from "../../../shared/interfaces/userUseCase";
import { CryptographyUseCase } from "../Cryptography/CryptographyUseCase";

export class UpdateUserUseCase implements IUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cryptographyUseCase: CryptographyUseCase,
	) {}

	async execute(data: IUser) {
		const user = await this.userRepository.findById(data.email);
		const userExists = await this.userRepository.findByEmail(data.email);

		if (user && user.user_id === userExists.user_id) {
			if (data.password) {
				const user_password_hash = await this.cryptographyUseCase.hash(data.password);
				await this.userRepository.updatePassword(user.user_id, user_password_hash);
			}
			await this.userRepository.update({ ...data });
			return null;
		}

		return new EmailInUseError(data.email);
	}
}
