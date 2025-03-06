import { CryptographyUseCase } from '../../data/usecase/Cryptography/CryptographyUseCase';
import { AddUserUseCase } from '../../data/usecase/User/AddUserUseCase';
import { UserPostgresRepository } from '../../database/repositories/UserPostgresRepository';
import { Controller } from '../../shared/interfaces/controller';
import { SignUpController } from './SignUpController';
import { SignUpValidation } from './SignUpValidation';

export const makeSignUpController = (): Controller => {
	const userPostgresRepository = new UserPostgresRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase = new AddUserUseCase(userPostgresRepository, cryptographyUseCase);
	const validate = new SignUpValidation();
	return new SignUpController(addUserUseCase, validate);
};
