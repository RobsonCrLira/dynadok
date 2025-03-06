import { IUser, UserRepository } from '../../../database/interfaces/UserRepository';
import { EmailInUseError } from '../../../shared/errors';
import { CryptographyUseCase } from '../Cryptography/CryptographyUseCase';

export class AddUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cryptographyUseCase: CryptographyUseCase,
	) {}

	async add(data: IUser): Promise<EmailInUseError | IUser> {
		const userExists = await this.userRepository.findByEmail(data.email);

		if (!userExists) {
			const user_password_hash = await this.cryptographyUseCase.hash(data.password);
			const user = await this.userRepository.create({ ...data, password_hash: user_password_hash });
			return user;
		}

		return new EmailInUseError(data.email);
	}
}
