import { IUser, UserRepository } from "../../../database/interfaces/UserRepository";
import { EmailInUseError } from "../../../shared/errors";
import { CryptographyUseCase } from "../Cryptography/CryptographyUseCase";

export class AddUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cryptographyUseCase: CryptographyUseCase,
	) {}

	async add(data: IUser) {
		const user = await this.userRepository.findById(data.email);
		const userExists = await this.userRepository.findByEmail(data.email);

		if (userExists) {
			let user_password_hash = "";
			if (data.password) {
				user_password_hash = await this.cryptographyUseCase.hash(data.password);
			}
			await this.userRepository.update({ ...data, password_hash: user_password_hash });
			return null;
		}

		return new EmailInUseError(data.email);
	}
}
