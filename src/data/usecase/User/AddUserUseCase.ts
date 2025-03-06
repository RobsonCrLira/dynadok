import { IUser, UserRepository } from "../../../database/interfaces/UserRepository";
import { EmailInUseError } from "../../../shared/errors";
import { IUserUseCase } from '../../../shared/interfaces/userUseCase';
import { CryptographyUseCase } from "../Cryptography/CryptographyUseCase";

export class AddUserUseCase implements IUserUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly cryptographyUseCase: CryptographyUseCase,
	) {}

	async execute(data: IUser): Promise<EmailInUseError | IUser> {
		const userExists = await this.userRepository.findByEmail(data.email);

		if (!userExists) {
			const password_hash = await this.cryptographyUseCase.hash(data.password);
			const user = await this.userRepository.create({ ...data, password_hash });
			return user;
		}

		return new EmailInUseError(data.email);
	}
}
